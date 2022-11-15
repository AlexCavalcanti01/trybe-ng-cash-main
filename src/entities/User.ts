import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinTable,
} from 'typeorm'
import { Account } from './Account'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  username: string

  @Column()
  password: string

  @OneToOne((type) => Account)
  @JoinTable({ name: 'account_id' })
  account: Account
}
