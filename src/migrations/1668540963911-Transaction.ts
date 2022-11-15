import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Transaction1668540963911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'debited_account_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'credited_account_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'transactionDebitedAccount',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['debited_account_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'transactionCreditedAccount',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['credited_account_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions')
  }
}
