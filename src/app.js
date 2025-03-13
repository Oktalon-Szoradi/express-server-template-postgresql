import colors from 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

// Import your routes here
import myRoute from './api/routes/myRoute.js'
import testRoute from './api/routes/testRoute.js'

dotenv.config()

const dirname = path.resolve()

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(dirname, '/public')))
app.use(express.json())

// Use your routes here
app.use('/myRoute', myRoute)
app.use('/test', testRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(colors.blue(`[ i ] Server running on port ${PORT}`))
)
