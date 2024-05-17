import prisma from '../server/db'

export const getOverallRanking = async (req, res) => {
  const PAGE_SIZE = 10
  try {
    const page = parseInt(req.query.page) || 1
    const userId = req.user.id

    const totalPages = Math.ceil((await prisma.ranking.count()) / PAGE_SIZE)

    const userDetails = await prisma.ranking.findUnique({
      where: {
        userId,
      },
      select: {
        totalScore: true,
        numberOfPredictions: true,
        rank: true,
        user: {
          select: {
            displayName: true,
            photo: true,
          },
        },
      },
    })

    const overallRanking = await prisma.ranking.findMany({
      select: {
        totalScore: true,
        numberOfPredictions: true,
        rank: true,
        user: {
          select: {
            displayName: true,
            photo: true,
          },
        },
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    })
    res.status(200).json({
      data: {
        overallRanking,
        userDetails,
        totalPages,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}
