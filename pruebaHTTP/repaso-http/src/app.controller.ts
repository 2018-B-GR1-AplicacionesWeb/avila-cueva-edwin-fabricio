import {Body, Controller, Get, Param, Post, Query, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia.service";

@Controller()
export class AppController {

    constructor(private readonly appService: AppService,
                private readonly noticiaService: NoticiaService) {

    }

    @Get('holaMUNDO')
    holaMundo(
        @Query() todosQUERYPARAMS:any,
        @Query('nombre') nombre:string,
    ): string {
        console.log('todos los query params', todosQUERYPARAMS)
        return 'HOLA MUNDO'+ nombre;
    }
    @Get('adiosMUNDO')
    adiosMundo(): string {
        return 'ADIOS MUNDO';
    }

    @Post('adiosMundoPost')
    adiosMundoPost():string{
        return 'adios MUNDO POST';
    }

    @Get('segmentoUno/segmentoDos/:idUsuario')
    parametroRuta(
        @Param('idUsuario') id
    ){
        return id;
    }

    // PARAMETROS DE CUERPO
    @Post('crearUsuario')
    crearUsuario(
        @Body()usuario:Usuario,
        @Body('nombre')nombre:string,
    ){
        //crear USUARIO
        console.log('usuario: ',usuario);
        console.log('nombre: ', nombre);
        return 'ok';
    }
///////////////////////////////////////////////////////
    //DEVOLVER HTML
    @Get('inicio')
    inicio(
        @Res() response,
        @Query('accion')accion:string,
        @Query('titulo')titulo:string,
    ){
        let mensaje = undefined;
        if(accion && titulo){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
                    break;
            }
        }
        //PRIMER PARAMETRO: nombre de la pagina
        //SEGUNOD PARAMETRO: varaibles como JSON
        response.render('inicio',
            {
                usuario: 'EDWIN',
                arreglo: this.noticiaService.arreglo,
                booleano:false,
                mensaje: mensaje,
            }
        );
    }

    @Post('eliminar/:idNoticia')
    //para eliminar vamos a
    // usar parametros de ruta
    eliminar(
        @Res() response,
        @Param('idNoticia') idNoticia:string,
    ){

        const noticiaBorrada = this.noticiaService.eliminar(Number(idNoticia));
        const parametroConsulta = `?accion=borrar&titulo=${noticiaBorrada.titulo}`;
        //despues de eliminar vamos a movernos a otro lado
        response.redirect('/inicio'+parametroConsulta)
    }

    //CREAR NOTICIA LA RUTA
    @Get('crear-noticia')
    crearNoticiaRuta(
        @Res() response,
    ){
        response.render('crear-noticia')
    }

    //CREAR NOTICIA FUNCION CON POST
    @Post('crear-noticia')
    crearNoticiaFuncion(
        @Res() response,
        @Body() noticia: Noticia,
    ){
        this.noticiaService.crear(noticia);
        response.redirect('/inicio')
    }

    @Get('/actualizar-noticia/:idNoticia')
    actualizarNoticiaVista(
        @Res() response,
        @Param('idNoticia')idNoticia:string,
    ){
        const noticiaEncontrada = this.noticiaService.buscarPorId(+idNoticia);
        response.render('crear-noticia',
            {
                noticia:noticiaEncontrada,
            }
        )
    }

    @Post('/actualizar-noticia/:idNoticia')
    actulizarNoticiaFuncion(
        @Res() response,
        @Param('idNoticia')idNoticia:string,
        @Body()noticia:Noticia,
    ) {
        this.noticiaService.actualizar(+idNoticia,noticia);
        response.redirect('/inicio')
    }

}

export interface Usuario {
    nombre: string;
}

export interface Noticia {
    id?: number;
    titulo?: string;
    descripcion?: string;
}