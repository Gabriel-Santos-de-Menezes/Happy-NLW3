import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import Image from './Image'

//decoration
@Entity('orphanages')
export default class Orphanage{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekdends: boolean;

    //Não existe no banco de dados
    @OneToMany(() => Image, image => image.orphanage, {
        //automaticamente atualizar as imagens com o seguinte orphanage
        cascade: ['insert', 'update']
    })
    //nome do campo que armazena a chave estrangeira
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];
}