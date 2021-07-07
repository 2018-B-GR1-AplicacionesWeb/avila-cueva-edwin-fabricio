import {Usuario} from "../03-http/videos/src/app.controller";

declare var require;
declare var Promise;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

/////////////////////////////RECURSOS/////////////////////
var nombreDelArchivo = 'bdd.jason';
const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Bienvenido a GameOver \n'+'¿Qué quieres hacer?',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};

const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese el id: '
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese el nombre: '
    },
];

const preguntaUsuarioBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre del usuario a buscar'
    }
];

//////////////////FUNCION PRINCIPAL///////////////////
function main() {
    console.log('Empezo');

    inicializarBase()
        .pipe(
            preguntarOpcion(),
            preguntarDatos()

            // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES
            , // Ejecutar Accion
            map(
                (respuestaMergeMapDePreguntas: DeTipoRespuestaEscogidaPorUsuario) => {

                    switch (respuestaMergeMapDePreguntas.respuestaEscogida.opcionMenu) {
                        case 'Crear':
                            const usuario = respuestaMergeMapDePreguntas.usuario;
                            respuestaMergeMapDePreguntas.respuestaBDD.bdd.usuarios.push(usuario)
                            return respuestaMergeMapDePreguntas;
                        default:
                            break;
                    }
                }
            ), // Guardar Base de Datos
            mergeMap(
                (respuesta: DeTipoRespuestaEscogidaPorUsuario) => {
                    return guardarBase(respuesta.respuestaBDD.bdd);
                },
            )
        )
        .subscribe(
            (mensaje) => {
                console.log(mensaje);
            },
            (error) => {
                console.log(error);
            }, () => {
                console.log('Completado');
                main();
            }
        )
}



/////////////////////////////////////FUNCIONES PARA EL PIPE DE INCIALIZAR BASE///////////////
function preguntarOpcion(){
return mergeMap( // preguntar opcion
    (respuestaFuncionInicializarBase: DeTipoRespuestaBDD) => {
        return preguntarMenu()
            .pipe(
                map(
                    (respuestaFuncionPreguntarMenu: DeTipoOpcionesPregunta) => {
                        return {//RESPUESTA ESCOGIDA POR EL USUARIO
                            respuestaEscogida: respuestaFuncionPreguntarMenu,
                            respuestaBDD: respuestaFuncionInicializarBase
                        }
                    }
                )
            )
    }
)
}


function  preguntarDatos() {
    return mergeMap(
        (respuestaMerMapPreguntarOpcion: DeTipoRespuestaEscogidaPorUsuario) => {
            switch (respuestaMerMapPreguntarOpcion.respuestaEscogida.opcionMenu) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (usuario:Usuario) => {//vamos a agregar a la respuesta MERGEMAP,
                                    //una propiedad del tipo usuario
                                    //respuestaMerMapPreguntarOpcion.usuario = usuario;
                                    return respuestaMerMapPreguntarOpcion
                                }
                            )
                        );
                default:
                    respuestaMerMapPreguntarOpcion.usuario = {
                        id: null,
                        nombre: null
                    };
                    rxjs.of(respuestaMerMapPreguntarOpcion)

            }
        }
    )
}



function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaFuncionLeerBDD: DeTipoRespuestaBDD) => {
                    if (respuestaFuncionLeerBDD.bdd) {
                        // truty / {}
                        return rxjs.of(respuestaFuncionLeerBDD)
                    } else {
                        // falsy / null
                        return rxjs.from(crearBDD())
                    }
                }
            )
        );
}


function preguntarMenu() {
    return rxjs.from(inquirer.prompt(preguntaMenu))
}


function leerBDD(){
    return new Promise(
        (resolve) => {
            fs.readFile(
                nombreDelArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        resolve({
                            mensaje: 'BASE DE DATOS VACÍA',
                            bdd: null
                        });
                    } else {
                        resolve({
                            mensaje: 'SI EXISTE LA BASE',
                            bdd: JSON.parse(contenidoLeido)
                        });
                    }

                }
            );
        }
    );
}

function crearBDD() {
    const contenidoInicialBDD = '{"usuarios":[],"juegos":[]}';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreDelArchivo,
                contenidoInicialBDD,
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'ERROR AL CREAR LA BASE',
                            error: 500
                        });
                    } else {
                        resolve({
                            mensaje: 'BDD CREADA',
                            bdd: JSON.parse('{"usuarios":[],"juegos":[]}')
                        });
                    }

                }
            )

        }
    )
}

function guardarBase(bdd: DeTipoBaseDeDatos) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreDelArchivo,
                JSON.stringify(bdd),
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error guardando BDD',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada'
                        })
                    }
                }
            )
        }
    );
}

function buscarUsuarioPorNombre(nombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreDelArchivo, 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);
                        const respuestaFind = bdd.usuarios
                            .find(
                                (usuario) => {
                                    return usuario.nombre === nombre;
                                }
                            );
                        resolve(respuestaFind);
                    }
                });
        }
    );
}

main();


interface DeTipoRespuestaBDD {
    mensaje: string,
    bdd: DeTipoBaseDeDatos
}

interface DeTipoBaseDeDatos {
    usuarios: DeTipoUsuario[];
    juegos: DeTipoJuego[];
}

interface DeTipoUsuario {
    id: number;
    nombre: string;
}

interface DeTipoJuego {
    id: number;
    nombre: string;
    idUsuario: number;
}

interface DeTipoOpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}

interface DeTipoRespuestaEscogidaPorUsuario {
    respuestaEscogida: DeTipoOpcionesPregunta,
    respuestaBDD: DeTipoRespuestaBDD
    usuario?: DeTipoUsuario
}




