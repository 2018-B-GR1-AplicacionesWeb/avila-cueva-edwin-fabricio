import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('inicio')
    inicio(
        @Res() response,
    ){
        response.render('inicio',
            {
                usuario:'Edwin',
                arreglo:[
                    {
                        titulo:'A',
                        descripcion:'Noticia A',
                    },
                    {
                        titulo:'B',
                        descripcion:'Noticia B',
                    },
                    {
                        titulo:'C',
                        descripcion:'Noticia C',
                    },
                ],
                boolean:true,
            }

        );
    }


}

