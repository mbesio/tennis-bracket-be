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
    // const testData = {
    //   data: [
    //     {
    //       Name: 'G. Dimitrov',
    //     },
    //     {
    //       Name: 'S. Tsitsipas',
    //     },
    //     {
    //       Name: 'A. de Minaur',
    //     },
    //     { Name: 'B. van de Zandschulp' },
    //     { Name: 'P. Cachin' },
    //     { Name: 'D. Galan' },
    //     { Name: 'J. Wolf' },
    //     { Name: 'S. Baez' },
    //     { Name: 'F. Tiafoe' },
    //     { Name: 'B. Coric' },
    //     { Name: 'T. Machac' },
    //     { Name: 'A. Tabilo' },
    //     { Name: 'D. Altmaier' },
    //     { Name: 'K. Khachanov' },
    //     { Name: 'A. de Minaur' },
    //     { Name: 'M. Arnaldi' },
    //     { Name: 'P. Kotov' },
    //   ],
    // }
    // res.status(200).json(testData)
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the API Service' })
  }
}
