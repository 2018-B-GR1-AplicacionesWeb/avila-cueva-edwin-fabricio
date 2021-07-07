//Primer caso conectarse a una base de datos que ya existe
//la opcion de synchronize debe de estar desabilitada
//si la base de datos no existe debe de estar activado synchronize

import {BeforeInsert, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PaginaEntity} from "./pagina/pagina.entity";

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
            type:'varchar',
            nullable: true
        }
    )
    descripcion:string;

    @OneToMany(
        type =>  PaginaEntity, //que tabla vamos a relacionar
        pagina => pagina.noticia //el campo que hace referencia
    )

        //trigger evento que se ejecuta en la base
        //ejecutar funciones dependiendo la base de datos, trigger antes de isertar, antes de eliminar
        //antes de borrar

    paginas: PaginaEntity[];

    @BeforeInsert()
    primerConsole(){
        console.log('Esta es el primer console');
    }
    @BeforeInsert()
    segundoConsole(){
        console.log(`EL titulo es ${this.titulo}`);
    }

}