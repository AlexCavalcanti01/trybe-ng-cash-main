import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Account } from './Account'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne((type) => Account)
  @JoinColumn({ name: 'debited_account_id', referencedColumnName: 'id' })
  debitedAccount: Account

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'credited_account_id', referencedColumnName: 'id' })
  creditedAccount: Account

  @Column()
  value: number

  @CreateDateColumn()
  createdAt: Date
}
