import app from './server'

const PORT = process.env.PORT || 3001
const SERVER_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_DOMAIN_PROD
    : process.env.SERVER_DOMAIN_DEV

app.listen(PORT, () => {
  console.log(`server running on ${SERVER_DOMAIN}:${PORT}`)
})
