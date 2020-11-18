import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddTofieldProviderIdInAppointment1605641447274
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.dropColumn('appointments', 'date');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'date',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'time',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'service_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'appointmentsProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'appointmentsUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'appointmentsService',
        columnNames: ['service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'services',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointmentsProvider');
    await queryRunner.dropForeignKey('appointments', 'appointmentsUser');
    await queryRunner.dropForeignKey('appointments', 'appointmentsService');

    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.dropColumn('appointments', 'user_id');
    await queryRunner.dropColumn('appointments', 'service_id');
    await queryRunner.dropColumn('appointments', 'time');
    await queryRunner.dropColumn('appointments', 'date');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'date',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
