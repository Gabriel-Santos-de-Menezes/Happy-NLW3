import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602610164076 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      //realizar as alterações no banco de dados
      //criar tabela, criar um novo campo...

      await queryRunner.createTable(new Table ({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,//Não pode ser nagativa
            isPrimary: true,//Chame primaria
            isGenerated: true,//Gerada automaticamente
            generationStrategy: 'increment',//Incremental
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,//Números depois da vírgula
            precision: 2,//Números antes da vírgula
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,//Números depois da vírgula
            precision: 2,//Números antes da vírgula
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'instructions',
            type: 'text',
          },
          {
            name: 'opening_hours',
            type: 'varchar',
          },
          {
            name: 'open_on_weekdends',
            type: 'boolean',
            default: false
          }
        ],
      }))
      
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      //Desfazer o que foi feito no UP
      await queryRunner.dropTable('orphanages');
  }

}
