import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Transaction } from './Transaction'

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  creditedTransactions: Transaction[]

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  debitedTransactions: Transaction[]
}
