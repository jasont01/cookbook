import path from 'path'
import express from 'express'
import routes from './routes.js'
import connectDB from './db.config.js'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(express.json())
app.use(cookieParser())

app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './', 'client', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Please set to production')
  })
}

app.listen(port, () => console.log(`Server started on port: ${port}`))
