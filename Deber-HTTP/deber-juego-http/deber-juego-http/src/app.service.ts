import { Injectable } from '@nestjs/common';
import {Empresa} from './app.controller';
import {writeFile,readFile} from "fs";

const nombreDelArchivo = 'bdd.json';
@Injectable()
export class AppService {

    inicializarBase() {
        return new Promise(
            (resolve, reject) => {
                readFile(
                    nombreDelArchivo,
                    'utf-8',
                    (error, contenidoArchivo) => {
                        if (error) {
                            writeFile(
                                nombreDelArchivo,
                                '{"empresas":[],"juegos":[]}',
                                (error) => {
                                    if (error) {
                                        reject({
                                            mensaje: 'ERROR AL CREAR LA BASE',
                                            error: 500
                                        })
                                    } else {
                                        resolve({
                                            mensaje: 'BDD CREADA CON EL SIGUIENTE CONTENIDO: ',
                                            bdd: JSON.parse('{"empresas":[],"juegos":[]}')
                                        })
                                    }

                                }
                            )

                        } else {
                            resolve({
                                mensaje: 'BDD LEÍDA, CON TIENE LO SIGUIENTE: ',
                                bdd: JSON.parse(contenidoArchivo)
                            })
                        }
                    }
                )
            }
        );
    };

  crearEmpresa(empresa:Empresa){
      return new Promise(
          (resolve, reject) => {
              readFile(
                  nombreDelArchivo,
                  'utf-8',
                  (error, contenidoArchivo) => {
                      if (error) {
                          reject({
                              mensaje: 'ERROR AL LEER LA BASE DE DATOS'
                          })
                      } else {
                          const bdd = JSON.parse(contenidoArchivo);
                          bdd.empresas.push(empresa);
                          resolve({
                              mensaje: 'BDD CREADA CON EL SIGUIENTE CONTENIDO: ',
                              bdd: bdd,
                          })
                      }
                  }
              )
          }
      );
  }
   guardarBDD(bdd) {
        return new Promise(
            (resolve, reject) => {
                writeFile(
                    nombreDelArchivo,
                    JSON.stringify(bdd),
                    (error) => {
                        if (error) {
                            reject({
                                mensaje: 'Error creando',
                                error: 500
                            })
                        } else {
                            resolve({
                                mensaje: 'BDD guardada',
                                bdd: bdd
                            })
                        }

                    }
                )
            }
        )
    }



}
