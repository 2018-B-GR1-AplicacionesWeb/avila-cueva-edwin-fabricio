import {
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Body,
    Headers,
    UnauthorizedException, Req, Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";
import {Request} from "express";
import {Response} from "express";
import {options} from "tsconfig-paths/lib/options";

@Controller()//decoradores

//controller('usuario')
//http://localhost:3000/usuario

export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()//http://ip:puerto
    //@Get('Crear')
    //http://localhost:3000/usuario/crear?nombre=Adrian

    //esto es una método
    @Get('holaMundoNombre')//cuando me hagan un request con el metodo GET vot a ejecutar esta función
          //acepta como parametro, la URL dque va a visitar el usuario
          //http://ip:puerto/url
   // @HttpCode(204)//status
    //por defecto el status es 200

    raiz(
        @Query() todosQueryParams:any,
        @Query('nombre') nombre:string,
    ): string {
        console.log(todosQueryParams);
        return 'hola mundo'+nombre;
    }







    @Get('adiosMundoPromesa')//cambiar la URL
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve('Adios Mundo');
                }
            )
        };
        return promesaAdios();
    }

    @Get('adiosMundoObservable')
    adiosMundoObservable():Observable<string>{
      const respesta$ = of('Adios Mundo Observable');
      return respesta$;
    }

    @Post('adiosMundoPost')
    adiosMundoPost(
        @Res() response,
    ){
        response.render('inicio',
            {
                usuario: 'Edwin',
                arreglo:[
                    {
                        titulo:'Noticia 1',
                        descripcion:'Acción',
                    },
                    {
                        titulo:'Noticia 2',
                        descripcion:'Acción',
                    },
                    {
                        titulo:'Noticia 3',
                        descripcion:'Acción',
                    },
                    {
                        titulo:'Noticia NUEVA',
                        descripcion:'Acción',
                    },
                ],
                booleano: true,
            }
        );
    }

    //parametros de cuerpo
    @Post('crearUsuario')
    @HttpCode(200)/*el codigo que se ejecuta solo cuando todo esta bien */
    crearUsuario(
        @Body()usuario:Usuario,
        @Body('nombre')nombre:String,
        @Headers()cabeceras,//cabeceras de peticion
        @Headers('seguridad')codigo,//cebecera de seguridad

        //vamos a mandar en la respuesta más cabeceras
        @Res()res:Response,

        //para las cookies
        @Res() req: Request,
    ){
        //imprimir la cookie
        console.log('COOKIES',req.cookies);//leído-->leyendo una cabecera de peticion
        console.log('cokies segura',req.signedCookies);


        //crear usuario
        console.log(usuario);
        console.log('cabeceras de perticion',cabeceras)
        if(codigo==='1234'){

            const bdd = this.appService.crearUsuario(usuario);//añadismosel usuario a la base

            res.append('TOKEN','5678');//debemos de usar los métodos del res..express
            res.cookie("app","web");//cookie insegura--
            res.cookie("segura","secreto", {
                signed:true,
            });
            res.json(bdd);
        }else {
            throw new UnauthorizedException({
                mensaje:'Error de autorización',
                error:401
            })
        }

    }






    //adios mundo async
    @Get('adiosMundoPromesaAsync')//cambiar la URL
    @HttpCode(201) //-->si sale bientodo ejecuta esto
    async adiosMundoPromesaAsync(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('Adios Mundo');
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            //acpeta como parametro un JSON
            //no mandar e
            //el desarrollador vee la consola
            console.log(e);
            //el usuario ve error servidor
            throw new InternalServerErrorException({mensaje: 'Error Sevidor'})
        }
    }

    @Get('inicio')
    inicio(
        @Res() response,
    ){
        response.render('inicio',
            {
            usuario: 'Edwin',
            arreglo:[
                {
                    titulo:'Noticia 1',
                    descripcion:'Acción',
                },
                {
                    titulo:'Noticia 2',
                    descripcion:'Acción',
                },
                {
                    titulo:'Noticia 3',
                    descripcion:'Acción',
                },
            ],
            booleano: false,
            }
        );
    }




}

export interface Usuario {

    nombre:String;
}
