import {Get, Controller, HttpCode, InternalServerErrorException, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }


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
    adiosMundoPost():string{
      return 'adios MUNDO post';
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



}
