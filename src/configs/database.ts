import { DataSource } from 'typeorm'

const config = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'trybengcash',
  entities: ['src/entity/*.ts'],
  migrations: ['src/migrations/*.ts'],
  logging: true,
  synchronize: true,
})

export default config
