//noticia.controller.ts

import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Noticia} from "../app.controller";
import {NoticiaService} from "./noticia.service";
import {NoticiaEntity} from "./noticia-entity";
import {FindManyOptions, Like} from "typeorm";
import {CreateNoticiaDto} from "./dto/create-noticia.dto";
import {validate, ValidationError} from "class-validator";

@Controller('noticia')
export class NoticiaController{

    // public servicio:AppService;
    constructor(private readonly _noticiaService: NoticiaService) {  // NO ES UN CONSTRUCTOR
        // this.servicio = servicio;
    }

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda:string,
        @Query('accion')accion: string,
        @Query('titulo')titulo:string,
    ) {
        let mensaje = undefined
        let clase = undefined

        if(accion && titulo){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
                    clase= 'alert alert-danger'
                    break;
                case 'crear':
                    mensaje = `Registro ${titulo} creado`
                    clase= 'alert alert-info'
                    break;
                case 'actualizar':
                    mensaje = `Registro ${titulo} actualizado`
                    clase= 'alert alert-success'
                    break;
            }
        }

        let noticias: NoticiaEntity[];
        if(busqueda){
            const consulta: FindManyOptions<NoticiaEntity>= {
                where:[
                    {
                        titulo: Like(`%${busqueda}%`)
                    },
                    {
                        descripcion: Like(`%${busqueda}%`)
                    }
                ]
            };
            noticias = await this._noticiaService.buscar(consulta);
        }else{
            noticias = await this._noticiaService.buscar();
        }

        response.render(
            'inicio',
            {
                usuario: 'Adrian',
                arreglo: noticias, // AQUI!
                booleano: false,
                mensaje: mensaje,
                clase: clase,
            }
        );
    }

    @Post('eliminar/:idNoticia')
    async eliminar(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
    ) {
        const noticia = await  this._noticiaService.buscarPorId(+idNoticia);
        await this._noticiaService.eliminar(Number(idNoticia));
        const parametrosConsulta = `?accion=borrar&titulo=${
            noticia.titulo
            }`;
        response.redirect('/noticia/inicio'+parametrosConsulta)
    }

    @Get('crear-noticia')
    crearNoticiaRuta(
        @Res() response
    ) {
        response.render(
            'crear-noticia'
        )
    }

    @Post('crear-noticia')
    async crearNoticiaFuncion(
        @Res() response,
        @Body() noticia: Noticia
    ) {

        const objetoValidacionNoticia = new CreateNoticiaDto();

        objetoValidacionNoticia.titulo = noticia.titulo;
        objetoValidacionNoticia.descripcion = noticia.descripcion;

        const errores: ValidationError[] =
            await validate(objetoValidacionNoticia);

        const hayErrores = errores.length>0;

        if(hayErrores){
            console.error(errores);
            //redirect crear noticia, y
            // en crear noticia deberia de mostrar menjsaes
            // como en la pantalla de INICIO
            throw new BadRequestException({mensaje:'Error de validacion'})
        }else{
            const respuesta = await this._noticiaService.crear(noticia);

            const parametrosConsulta = `?accion=crear&titulo=${noticia.titulo}`;

            response.redirect(
                '/noticia/inicio' + parametrosConsulta
            )
        }

    }

    @Get('actualizar-noticia/:idNoticia')
    async actualizarNoticiaVista(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
    ) {
        // El "+" le transforma en numero a un string
        // numerico
        const noticiaEncontrada = await this._noticiaService
            .buscarPorId(+idNoticia);

        response
            .render(
                'crear-noticia',
                {
                    noticia: noticiaEncontrada
                }
            )


    }

    @Post('actualizar-noticia/:idNoticia')
    async actualizarNoticiaMetedo(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
        @Body() noticia: Noticia
    ) {
        noticia.id = +idNoticia;
       await this._noticiaService.actualizar(noticia);

        response.redirect('/noticia/inicio');

    }


}

export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
