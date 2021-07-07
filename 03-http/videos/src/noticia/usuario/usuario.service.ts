import {Injectable} from "@nestjs/common";
import {FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuaruiRepository:
            Repository<UsuarioEntity>
    ){

    }
        async auntenticar(username:string,
                    password: string):Promise<boolean>{
        //Password encriptada
            //encriptar el password que les llega
            //
            const consulta:FindOneOptions<UsuarioEntity>={
                where:{
                    username: username,
                    password:password//guardamos encriptado
                }
            };
            const respuesta = await this._usuaruiRepository.findOne();
            if (respuesta){
                return true;
            } else{
                return false;
            }
        }

}