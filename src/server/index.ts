import app from './server'

const PORT = process.env.PORT || 3001
const SERVER_DOMAIN = process.env.SERVER_DOMAIN

app.listen(PORT, () => {
  console.log(`server running on ${SERVER_DOMAIN}`)
})
