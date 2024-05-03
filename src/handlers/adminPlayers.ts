import axios from 'axios'

export const getPlayers = async (req, res) => {
  try {
    const NUM_OF_PLAYERS = 200

    const options = {
      method: 'GET',
      url: `${process.env.X_RAPID_API_PLAYERS_URL}/${NUM_OF_PLAYERS}`,
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.X_RAPID_API_HOST,
      },
    }

    const response = await axios.request(options)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the API Service' })
  }
}
