import prisma from '../server/db'

import { createClient } from 'redis'
import { PUB_SUB_CHANNEL } from '../handlers/admin'

export const createPubSubSubscriber = () => {
  const client = createClient()
  const subscriber = client.duplicate()
  subscriber.on('error', (err) => console.log(err))
  ;(async () => {
    try {
      await subscriber.connect()
    } catch (err) {
      console.error('Failed to connect to Redis:', err)
    }
  })()

  subscriber.subscribe(PUB_SUB_CHANNEL, async (message, channel) => {
    // Handle the message here
    console.log(
      `Received message from channel: ${channel} with message: ${message}`
    )
    const tournamentYearId = JSON.parse(message)
    const predictions = await prisma.prediction.findMany({
      where: {
        tournamentYearId,
      },
    })
    console.log('predictions pubsub', predictions)

    const results = await prisma.tournamentYear.findUnique({
      where: {
        id: tournamentYearId,
      },
    })

    console.log('results pubsub', results)

    const semifinalistFirstQuarter = JSON.parse(
      results.semifinalistFirstQuarter
    ).name
    const semifinalistSecondQuarter = JSON.parse(
      results.semifinalistSecondQuarter
    ).name
    const semifinalistThirdQuarter = JSON.parse(
      results.semifinalistThirdQuarter
    ).name
    const semifinalistFourthQuarter = JSON.parse(
      results.semifinalistFourthQuarter
    ).name
    const finalistTopHalf = JSON.parse(results.finalistTopHalf).name
    const finalistBottomHalf = JSON.parse(results.finalistBottomHalf).name
    const winner = JSON.parse(results.winner).name

    const SCORE_CORRECT_SEMIFINALIST = 10
    const SCORE_CORRECT_FINALIST = 20
    const SCORE_CORRECT_WINNER = 30

    const scores = predictions.map(
      ({
        predictionFirstQuarterSemiFinalist,
        predictionSecondQuarterSemiFinalist,
        predictionThirdQuarterSemiFinalist,
        predictionFourthQuarterSemiFinalist,
        predictionTopHalfFinalist,
        predictionBottomHalfFinalist,
        predictionWinner,
        userId,
        id,
      }) => {
        let score = 0
        if (predictionFirstQuarterSemiFinalist === semifinalistFirstQuarter) {
          score += SCORE_CORRECT_SEMIFINALIST
        }
        if (predictionSecondQuarterSemiFinalist === semifinalistSecondQuarter) {
          score += SCORE_CORRECT_SEMIFINALIST
        }
        if (predictionThirdQuarterSemiFinalist === semifinalistThirdQuarter) {
          score += SCORE_CORRECT_SEMIFINALIST
        }
        if (predictionFourthQuarterSemiFinalist === semifinalistFourthQuarter) {
          score += SCORE_CORRECT_SEMIFINALIST
        }
        if (predictionTopHalfFinalist === finalistTopHalf) {
          score += SCORE_CORRECT_FINALIST
        }
        if (predictionBottomHalfFinalist === finalistBottomHalf) {
          score += SCORE_CORRECT_FINALIST
        }
        if (predictionWinner === winner) {
          score += SCORE_CORRECT_WINNER
        }
        return {
          predictionId: id,
          userId,
          tournamentYearId,
          score,
        }
      }
    )
    const deleteScoresIfExists = await prisma.score.deleteMany({
      where: {
        tournamentYearId,
      },
    })

    const updateScores = await prisma.score.createMany({
      data: scores,
    })

    await prisma.$queryRaw`TRUNCATE TABLE "Ranking";`

    const newRanking = await prisma.$queryRaw`
    SELECT "userId", CAST(SUM("score") as INT) as "totalScore", CAST(COUNT(*) as INT) as "numberOfPredictions", CAST(ROW_NUMBER() OVER (ORDER BY SUM(score) DESC) as INT) as rank
    FROM "Score"
    GROUP BY "userId"
    ORDER BY "totalScore" DESC`

    interface Ranking {
      userId: string
      totalScore: number
      numberOfPredictions: number
      rank: number
    }

    const updateRanking = await prisma.ranking.createMany({
      data: newRanking as unknown as Ranking[],
    })
  })
}
