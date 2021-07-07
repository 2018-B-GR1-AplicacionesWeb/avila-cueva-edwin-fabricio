import {Module} from "@nestjs/common";
import {DistribuidorController} from "./distribuidor.controller";
import {DistribuidorService} from "./distribuidor.service";

@Module({
    imports:[],
    controllers:[DistribuidorController],
    providers:[DistribuidorService],
})
export class DistribuidorModule {

}