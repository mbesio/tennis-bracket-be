import app from './server'

const PORT = process.env.PORT


app.listen(PORT, () => {
  console.log(`hello from:${PORT}`)
})

