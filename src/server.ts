import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import databaseConfig from './configs/database'
import { router } from './routes'

dotenv.config()

databaseConfig
  .initialize()
  .then(() => console.log('Data source has been initialized!'))
  .catch((err) => console.error('Error during Data Source initilization:', err))

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(router)

app.listen(port, () =>
  console.log(`[server]: Server is running at http://localhost:${port}`)
)
