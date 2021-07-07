import {Injectable} from "@nestjs/common";
import {Noticia} from "./app.controller";

@Injectable()
export class NoticiaService {


    arreglo: Noticia[] = [
        {
            id:1,
            titulo:'A',
            descripcion:'hola A',
        },
        {
            id:2,
            titulo:'B',
            descripcion:'hola B',
        },
        {
            id:3,
            titulo:'C',
            descripcion:'hola C',
        },
        {
            id:4,
            titulo:'D',
            descripcion:'hola D',
        },
    ]
    numeroRegistro = 5;

    crear(noticia:Noticia):Noticia{
        noticia.id = this.numeroRegistro;
        this.numeroRegistro++;
        this.arreglo.push(noticia);
        return noticia;
    }

    eliminar(idNoticia:Number): Noticia{
        const indiceNoticia = this.arreglo
            .findIndex(
                (noticia)=>{
                    return noticia.id === idNoticia
                }
            );
        const registroEliminado = JSON.parse(JSON.stringify(this.arreglo[indiceNoticia]))
        this.arreglo.splice(indiceNoticia,1);
        return registroEliminado;
    }

    actualizar (idNoticia: number, nuevaNoticia: Noticia):Noticia{
        const indiceNoticia = this.arreglo
            .findIndex(
                (noticia)=>{
                    return noticia.id === idNoticia
                }
            );
        this.arreglo[indiceNoticia]= nuevaNoticia;

        return this.arreglo[indiceNoticia];
    }

    buscarPorId(idNoticia:Number):Noticia{
        const indiceNoticia = this.arreglo
            .findIndex(
                (noticia)=>{
                    return noticia.id === idNoticia
                }
            );
        return this.arreglo[indiceNoticia];
    }
}