import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinTable,
} from 'typeorm'
import { Account } from './Account'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne((type) => Account)
  @JoinTable({ name: 'debited_account_id' })
  debitedAccountId: Account

  @OneToOne((type) => Account)
  @JoinTable({ name: 'credited_account_id' })
  creditedAccountId: Account

  @Column()
  value: number

  @CreateDateColumn()
  createdAt: Date
}
