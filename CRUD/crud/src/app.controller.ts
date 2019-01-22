import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('pagina-principal')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('inicio')
  inicio(
      @Res() response,
  ){
    response.render('pagina-principal')
  }
}
