//Primer caso conectarse a una base de datos que ya existe
//la opcion de synchronize debe de estar desabilitada
//si la base de datos no existe debe de estar activado synchronize

import {Column} from "typeorm";

export class NoticiaEntity{
    @Column()
    titulo:string;

    @Column()
    descripcion:string;

}