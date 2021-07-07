var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
/////////////////////////////RECURSOS/////////////////////
var nombreDelArchivo = 'bdd.jason';
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Bienvenido a GameOver \n' + '¿Qué quieres hacer?',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};
var preguntaUsuario = [
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
var preguntaUsuarioBusquedaPorNombre = [
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
        .pipe(mergeMap(// preguntar opcion
    function (respuestaFuncionInicializarBase) {
        return preguntarMenu()
            .pipe(map(function (respuestaFuncionPreguntarMenu) {
            return {
                respuestaEscogida: respuestaFuncionPreguntarMenu,
                respuestaBDD: respuestaFuncionInicializarBase
            };
        }));
    }), // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES
    mergeMap(function (respuestaMerMapPreguntarOpcion) {
        switch (respuestaMerMapPreguntarOpcion.respuestaEscogida.opcionMenu) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario))
                    .pipe(map(function (usuario) {
                    //una propiedad del tipo usuario
                    respuestaMerMapPreguntarOpcion.usuario = usuario;
                    return respuestaMerMapPreguntarOpcion;
                }));
            case 'Buscar':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuarioBusquedaPorNombre))
                    .pipe(map(function (usuarioABuscar) {
                    respuestaMerMapPreguntarOpcion.usuario = usuarioABuscar;
                    return respuestaMerMapPreguntarOpcion;
                }));
            default:
                respuestaMerMapPreguntarOpcion.usuario = {
                    id: null,
                    nombre: null
                };
                rxjs.of(respuestaMerMapPreguntarOpcion);
        }
    }), // Ejecutar Accion
    map(function (respuestaMergeMapDePreguntas) {
        switch (respuestaMergeMapDePreguntas.respuestaEscogida.opcionMenu) {
            case 'Crear':
                var usuario = respuestaMergeMapDePreguntas.usuario;
                respuestaMergeMapDePreguntas.respuestaBDD.bdd.usuarios.push(usuario);
                return respuestaMergeMapDePreguntas;
            case 'Buscar':
                return respuestaMergeMapDePreguntas;
            default:
                break;
        }
    }), // Guardar Base de Datos
    mergeMap(function (respuesta) {
        return guardarBase(respuesta.respuestaBDD.bdd);
    }, mergeMap(function (respuesta) {
        return buscarUsuarioPorNombre(respuesta.usuario.nombre);
    })))
        .subscribe(function (mensaje) {
        console.log(mensaje);
    }, function (error) {
        console.log(error);
    }, function () {
        console.log('Completado');
        main();
    });
}
function inicializarBase() {
    var leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(mergeMap(function (respuestaFuncionLeerBDD) {
        if (respuestaFuncionLeerBDD.bdd) {
            // truty / {}
            return rxjs.of(respuestaFuncionLeerBDD);
        }
        else {
            // falsy / null
            return rxjs.from(crearBDD());
        }
    }));
}
function preguntarMenu() {
    return rxjs.from(inquirer.prompt(preguntaMenu));
}
function leerBDD() {
    return new Promise(function (resolve) {
        fs.readFile(nombreDelArchivo, 'utf-8', function (error, contenidoLeido) {
            if (error) {
                resolve({
                    mensaje: 'BASE DE DATOS VACÍA',
                    bdd: null
                });
            }
            else {
                resolve({
                    mensaje: 'SI EXISTE LA BASE',
                    bdd: JSON.parse(contenidoLeido)
                });
            }
        });
    });
}
function crearBDD() {
    var contenidoInicialBDD = '{"usuarios":[],"juegos":[]}';
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreDelArchivo, contenidoInicialBDD, function (err) {
            if (err) {
                reject({
                    mensaje: 'ERROR AL CREAR LA BASE',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD CREADA',
                    bdd: JSON.parse('{"usuarios":[],"juegos":[]}')
                });
            }
        });
    });
}
function guardarBase(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreDelArchivo, JSON.stringify(bdd), function (err) {
            if (err) {
                reject({
                    mensaje: 'Error guardando BDD',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada'
                });
            }
        });
    });
}
function buscarUsuarioPorNombre(nombre) {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreDelArchivo, 'utf-8', function (err, contenido) {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                var bdd = JSON.parse(contenido);
                var respuestaFind = bdd.usuarios
                    .find(function (usuario) {
                    return usuario.nombre === nombre;
                });
                resolve(respuestaFind);
            }
        });
    });
}
main();
