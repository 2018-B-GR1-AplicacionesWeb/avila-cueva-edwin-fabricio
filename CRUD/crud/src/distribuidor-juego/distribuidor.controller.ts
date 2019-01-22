import {Controller, Get, Res} from "@nestjs/common";
import {DistribuidorService} from "./distribuidor.service";

@Controller('distribuidor')
export class DistribuidorController {
    constructor(private readonly distribuidorService:DistribuidorService){

    }


@Get('inicio')
    inicio(){

    }






}


