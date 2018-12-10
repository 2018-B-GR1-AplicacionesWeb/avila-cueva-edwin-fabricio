import {
    Headers,
    Get,
    Controller,
    InternalServerErrorException,
    HttpCode,
    Post,
    Query,
    Param,
    Body,
    UnauthorizedException, Req, Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable,of} from "rxjs";
import {Request} from "express";

@Controller() //decorador
//Controller('Usuario')
//http : //localhost:3000/usuario
export class AppController {
    constructor(private readonly appService: AppService) {}


    @Get()

    //para comunicarnos con http y request debemos de definir
    //canal

    //Cuando me hagan una peticion con el metodo GET
    //EJECUTO ESTO
    @Get()
    //este es un método de la clase
    raiz(
        @Query()todosLosQueryParams: any,
        @Query('nombre')nombre: string,
    ): string {
        return 'HOLA MUNDO MIO' + nombre;
    }

    //parametro de ruta
    @Get('segmentoUno/segmentoDos/:idUsuario')
    //http: //localhost:300/usuario/segemtnoUno/segmentoDos/Pepito
    parametroRuta(
        @Param('idUsuario') id
    ){
        return id;
    }


    @Get('adiosMundo')//cambiar la URL:adiosMundo
    adiosMundo(): string{
        return 'ADIOS MUNDO MIO';
    }

    @Post('adiosMundo')//cambiar la URL:adiosMundoPost
    adiosMundoPost(): string{
        return 'ADIOS MUNDO POST';
    }





    @Get('adiosMundoPromesa')//cambiar la URL:adiosMundo
    adiosMundoPromesa(): Promise<string>{
        const promesaAdios =():Promise<string> =>{
            return new Promise(
                (resolve)=>{
                    resolve('Adios Mundo Promesa');
                }
            )
        };
        return promesaAdios();
    }

    @Get('adiosMundoPromesaASYNC')//cambiar la URL:adiosMundo
    @HttpCode(201)
    async adiosMundoPromesaASYNC(){
        const promesaAdios =():Promise<string> =>{
            return new Promise(
                (reject)=>{
                    reject('Adios Mundo Promesa ASYNC');
                }
            )
        };
        try {
        const respuesta:string = await promesaAdios();
        return respuesta;
        }catch (e) {
            console.log(e);
            throw new InternalServerErrorException(
                {
                    mensaje: 'ERROR DEL SERVIDOR'
                }
            )
        }
    }


    @Get('adiosMundoObservable')
    adiosMundoObservable(): Observable<string>{
        const respuesta$ = of('Adios Mundo Observable');
        return respuesta$;
    }



    ///parametro de cuerpo
    @Post('crearUsuario')
    crearUsuario(
        @Body() usuario:Usuario,
        @Body('nombre') nombre:string,
        //leer cabeceras
        @Headers()cabeceras,
        @Headers('seguridad')codigo,
        //para mandar nosotros cabeceras
        @Res()res,
        //cookies
        @Req() req: Request,
    ){
        console.log('aqui estan las cokkies',req.cookies);
        console.log(usuario);
        console.log(cabeceras);//cabeceras de peticion
        if(codigo === '1234'){
            res.append('token','5678');
            res.send('ok');
        //Crear Usuario
        return 'ok';
        }else {
            throw  new UnauthorizedException({
                mensaje: 'ERROR DE AUTORIZACION',
                error: 401,
            })
            console.log('SI ENTRO AL ERROR')
        }
    }
}

interface Usuario {
    nombre:string;
}

