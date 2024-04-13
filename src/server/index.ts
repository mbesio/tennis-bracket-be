import app from './server'

const PORT = process.env.PORT


app.listen(PORT, () => {
  console.log(`hello on http://localhost:${PORT}`)
})

