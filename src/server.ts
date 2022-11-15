import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import databaseConfig from './configs/database'

dotenv.config()

databaseConfig
  .initialize()
  .then(() => console.log('Data source has been initialized!'))
  .catch((err) => console.error('Error during Data Source initilization:', err))

const app: Express = express()
app.use(express.json())
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express')
})

app.listen(port, () =>
  console.log(`[server]: Server is running at http://localhost:${port}`)
)
