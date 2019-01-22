import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {NoticiaEntity} from "../noticia-entity";
import {ArticuloEntity} from "../articulo/articulo.entity";

@Entity('pagina')
export class PaginaEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    numero:number

    @ManyToOne(
        type => NoticiaEntity,
        noticia => noticia.paginas
    )

    noticia: NoticiaEntity;

    @OneToMany(
        type => ArticuloEntity,
        articulo => articulo.pagina
    )

    articulos: ArticuloEntity[]

}