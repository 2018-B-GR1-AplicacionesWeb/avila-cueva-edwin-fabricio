var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var timer = require('rxjs').timer;
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
////////////////////////////////////////////////////////RECURSOS///////////////////////////////////////
var nombreDelArchivo = 'bdd.json';
var preguntaMenu = {
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
var preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese ID Usuario: '
    }
];
var preguntaEliminarPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es el usuario que quiere eliminar? '
    }
];
var preguntaBuscarNombreUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre de Usuario a Buscar: '
    }
];
var preguntaUsuario = [
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
var preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre? '
    },
];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////INICIO DEL PROGRAMA///////////////////////////////////////////////////////
////////////////////////// INCIALIZACION BASE
function inicialiarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreDelArchivo, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile(nombreDelArchivo, '{"usuarios":[],"juegos":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'ERROR AL CREAR BASE',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD LEÍDA',
                            bdd: JSON.parse('{"usuarios":[],"juegos":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD LEÍDA',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
////////////////////////////////////  MAIN
function main() {
    var respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
        .subscribe(function (data) {
        //
        console.log(data);
    }, function (error) {
        //
        console.log(error);
    }, function () {
        main();
        console.log('Complete');
    });
}
////////////////////////////////////////////////////////// FUNCIONES PARA EL PIPE ////////////////////////////////////////
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreDelArchivo, JSON.stringify(bdd), function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
main();
function preguntarOpcionesMenu() {
    return mergeMap(// Respuesta Anterior Observable
    function (respuestaBDD) {
        return rxjs
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
            // Cualquier cosa JS
        }));
        // OBSERVABLE!!!!!!!!!!
    });
}
function opcionesRespuesta() {
    return mergeMap(function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario))
                    .pipe(map(function (usuario) {
                    respuestaBDD.usuario = usuario;
                    return respuestaBDD;
                }));
            case 'Buscar':
                return buscarUsuarioPorNombre(respuestaBDD);
                break;
            case 'Actualizar':
                return preguntarIdUsuario(respuestaBDD);
            case 'Borrar':
                return eliminarPorNombre(respuestaBDD);
                break;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                var usuario = respuestaBDD.usuario;
                respuestaBDD.bdd.usuarios.push(usuario);
                return respuestaBDD;
            case 'Actualizar':
                var indice = respuestaBDD.indiceUsuario;
                respuestaBDD.bdd.usuarios[indice].nombre = respuestaBDD.usuario.nombre;
                return respuestaBDD;
            case 'Buscar':
                console.log(respuestaBDD.bdd);
                console.log('Usuario Encontrado: ', respuestaBDD.usuario);
                return respuestaBDD;
            case 'Borrar':
                console.log('Usuario Eliminado correctamente:', respuestaBDD.bdd.usuarios);
                return respuestaBDD;
        }
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// FUNCIONES A REALIZAR /////////////////////////////////////////////////////////
function preguntarIdUsuario(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var indiceUsuario = respuestaBDD.bdd
            .usuarios
            .findIndex(// -1
        function (usuario) {
            return usuario.id === respuesta.idUsuario;
        });
        if (indiceUsuario === -1) {
            console.log('preguntando de nuevo');
            return preguntarIdUsuario(respuestaBDD);
        }
        else {
            respuestaBDD.indiceUsuario = indiceUsuario;
            return rxjs
                .from(inquirer.prompt(preguntaEdicionUsuario))
                .pipe(map(function (nombre) {
                respuestaBDD.usuario = {
                    id: null,
                    nombre: nombre.nombre
                };
                return respuestaBDD;
            }));
        }
    }));
}
function buscarUsuarioPorNombre(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarNombreUsuario))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var usuarioEncontrado = respuestaBDD.bdd.usuarios
            .find(function (usuario) {
            return usuario.nombre === respuesta.nombre;
        });
        respuestaBDD.usuario = usuarioEncontrado;
        return rxjs.of(respuestaBDD);
    }));
}
function eliminarPorNombre(respuestaBDD) {
    return rxjs.from(inquirer.prompt(preguntaEliminarPorNombre))
        .pipe(mergeMap(function (respuesta) {
        var indiceDelNombre = respuestaBDD.bdd.usuarios.findIndex(function (usuario) {
            return usuario.nombre === respuesta.nombre;
        });
        console.log(indiceDelNombre);
        var resultadoSplice = respuestaBDD.bdd.usuarios.splice(indiceDelNombre, 1);
        console.log(respuestaBDD);
        return rxjs.of(respuestaBDD);
    }));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
