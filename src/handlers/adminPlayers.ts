import axios from 'axios'

export const getPlayers = async (req, res) => {
  // TO DO - eventually will need to add some try catch blocks
  const NUM_OF_PLAYERS = 200

  const options = {
    method: 'GET',
    url: `${process.env.X_RAPID_API_PLAYERS_URL}/${NUM_OF_PLAYERS}`,
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.X_RAPID_API_HOST
    }
  }

const response = await axios.request(options);
res.json(response.data)
}