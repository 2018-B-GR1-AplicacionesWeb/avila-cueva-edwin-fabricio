//Primer caso conectarse a una base de datos que ya existe
//la opcion de synchronize debe de estar desabilitada
//si la base de datos no existe debe de estar activado synchronize

import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('noticia')
export class NoticiaEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Index(
        {

        }
    )
    @Column(
        {
            name: 'titulo_noticia',
            type:'varchar',
            length:50
        }
    )
    titulo:string;

    @Column(
        {
            name:'descripcion_noticia',
            type:'text',
            nullable: true
        }
    )
    descripcion:string;

}