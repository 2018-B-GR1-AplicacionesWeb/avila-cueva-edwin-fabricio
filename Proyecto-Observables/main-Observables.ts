declare var require;
declare var Promise;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

////////////////////////////////////////////////////////RECURSOS///////////////////////////////////////
const nombreDelArchivo = 'bdd.json';

const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: '¿Que quieres hacer? ',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};

const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese ID Usuario: ',
    }
];

const preguntaEliminarPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es el usuario que quiere eliminar? ',
    }
];

const preguntaBuscarNombreUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre de Usuario a Buscar: ',
    }
];

const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: '¿Cual es tu id? '
    },
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cual es tu nombre? '
    },
];

const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre? '
    },
];

const preguntaJuegos = [
    {
        type: 'input',
        name: 'id',
        message: '¿id Juego? '
    },
    {
        type: 'input',
        name: 'nombre',
        message: '¿Nombre del Juego? '
    },
    {

    }
];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////INICIO DEL PROGRAMA///////////////////////////////////////////////////////
////////////////////////// INCIALIZACION BASE
function inicialiarBDD() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreDelArchivo,
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        fs.writeFile(
                            nombreDelArchivo,
                            '{"usuarios":[],"juegos":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'ERROR AL CREAR BASE',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD LEÍDA',
                                        bdd: JSON.parse('{"usuarios":[],"juegos":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD LEÍDA',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );
}
////////////////////////////////////  MAIN
function main() {
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )

}



////////////////////////////////////////////////////////// FUNCIONES PARA EL PIPE ////////////////////////////////////////
function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
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

main();

function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {
            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                            // Cualquier cosa JS
                        }
                    )
                );
            // OBSERVABLE!!!!!!!!!!
        }
    )
}

function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (usuario: Usuario) => { // resp ant OBS
                                    respuestaBDD.usuario = usuario;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':
                    return buscarUsuarioPorNombre(respuestaBDD);
                    break;
                case 'Actualizar':
                    return preguntarIdUsuario(respuestaBDD);
                case 'Borrar':
                    return eliminarPorNombre(respuestaBDD);
                    break;
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const usuario = respuestaBDD.usuario;
                    respuestaBDD.bdd.usuarios.push(usuario);
                    return respuestaBDD;
                case 'Actualizar':
                    const indice = respuestaBDD.indiceUsuario;
                    respuestaBDD.bdd.usuarios[indice].nombre = respuestaBDD.usuario.nombre;
                    return respuestaBDD;
                case 'Buscar':
                    console.log(respuestaBDD.bdd)
                    console.log('Usuario Encontrado: ',respuestaBDD.usuario);
                    return respuestaBDD;
                case 'Borrar':
                    console.log('Usuario Eliminado correctamente:', respuestaBDD.bdd.usuarios);
                    return respuestaBDD;

            }
        }
    )
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////INTERFACES ////////////////////////////////////////////////////7

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    usuario?: Usuario;
    indiceUsuario?: number;
}

interface BDD {
    usuarios: Usuario[] | any;
    mascotas: Juego[];
}

interface Usuario {
    id: number;
    nombre: string;
}

interface Juego {
    id: number;
    nombre: string;
    idUsuario: number;
}

interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}

interface BuscarUsuarioPorNombre {
    nombre: string;
}

interface EliminarPorNombre {
    nombre: string;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////// FUNCIONES A REALIZAR /////////////////////////////////////////////////////////

function preguntarIdUsuario(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (usuario: any) => {
                                return usuario.id === respuesta.idUsuario
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarIdUsuario(respuestaBDD);
                    } else {
                        respuestaBDD.indiceUsuario = indiceUsuario;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionUsuario))
                            .pipe(
                                map(///trnandgormale al bovservablse , recibe un JASON
                                    (nombre:{nombre:string})=>{
                                        respuestaBDD.usuario ={
                                            id:null,
                                            nombre:nombre.nombre
                                        };
                                        return respuestaBDD; // retorna cualquier cosa
                                    }
                                )
                            );
                    }
                }
            )
        );
}

function buscarUsuarioPorNombre(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarNombreUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorNombre) => {
                    const usuarioEncontrado = respuestaBDD.bdd.usuarios
                        .find(
                            (usuario)=>{
                                return usuario.nombre === respuesta.nombre;
                            }
                        )
                    respuestaBDD.usuario = usuarioEncontrado;
                    return rxjs.of(respuestaBDD);
                }
            )
        );
}

function eliminarPorNombre(respuestaBDD: RespuestaBDD) {
    return rxjs.from(inquirer.prompt(preguntaEliminarPorNombre))
        .pipe(
            mergeMap(
                (respuesta: EliminarPorNombre)=>{
                    const indiceDelNombre = respuestaBDD.bdd.usuarios.findIndex((usuario)=>{
                        return usuario.nombre === respuesta.nombre;
                    });
                    console.log(indiceDelNombre)
                    const resultadoSplice = respuestaBDD.bdd.usuarios.splice(indiceDelNombre,1);
                    return rxjs.of(respuestaBDD);
                }
            )
        )

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////