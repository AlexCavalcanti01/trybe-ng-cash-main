import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1668540630497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar(255)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'account_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'userAccount',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['account_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
