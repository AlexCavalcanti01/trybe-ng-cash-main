import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  balance: number
}
