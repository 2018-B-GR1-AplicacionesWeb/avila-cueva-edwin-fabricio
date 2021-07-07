var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var inquirer = require('inquirer');
var fs = require('fs');
var nombreArchivo = 'bdd.json';
var opcionesMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Escoge la opción qué desees: ',
    choices: [
        'Crear',
        'Borrar',
        'Actualizar',
        'Buscar',
    ]
};
var preguntasAlUsuario = [
    { type: 'input', name: 'idUsuario', message: 'Ingrese un ID: ' },
    { type: 'input', name: 'nombreUsuario', message: 'Ingrese el nombre del usuario: ' },
];
var preguntaParaBuscar = [
    { type: 'input', name: 'nombreABuscar', message: 'Que nombre desea Buscar: ' }
];
var preguntaParaEliminar = [
    { type: 'input', name: 'nombreABuscar', message: 'Que nombre desea Buscar: ' }
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var respuestaOpcionMenu, _a, respuestaPreguntasAlUsuario, respuestaAñadirUsuario, respuestaPreguntaParaBuscar, respuestaBuscarUnUsuario, respuestaPreguntaParaEliminar, respuestaEliminarUsuario, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 14, , 15]);
                    return [4 /*yield*/, inicilizarBase()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, inquirer.prompt(opcionesMenu)];
                case 2:
                    respuestaOpcionMenu = _b.sent();
                    console.log('Respuesta.opcionMenu: ', respuestaOpcionMenu.opcionMenu);
                    _a = respuestaOpcionMenu.opcionMenu;
                    switch (_a) {
                        case 'Crear': return [3 /*break*/, 3];
                        case 'Buscar': return [3 /*break*/, 6];
                        case 'Borrar': return [3 /*break*/, 9];
                        case 'Actualizar': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 13];
                case 3:
                    console.log('Pedir Datos');
                    return [4 /*yield*/, inquirer.prompt(preguntasAlUsuario)];
                case 4:
                    respuestaPreguntasAlUsuario = _b.sent();
                    console.log('respuestas al Usuario', respuestaPreguntasAlUsuario);
                    return [4 /*yield*/, añadirDatosALaBase(respuestaPreguntasAlUsuario)];
                case 5:
                    respuestaAñadirUsuario = _b.sent();
                    main();
                    return [3 /*break*/, 13];
                case 6: return [4 /*yield*/, inquirer.prompt(preguntaParaBuscar)];
                case 7:
                    respuestaPreguntaParaBuscar = _b.sent();
                    console.log(respuestaPreguntaParaBuscar.nombreABuscar);
                    return [4 /*yield*/, buscarUsuario(respuestaPreguntaParaBuscar.nombreABuscar)];
                case 8:
                    respuestaBuscarUnUsuario = _b.sent();
                    console.log('USUARIO QUE QUERIA BUSCAR -->  ', respuestaBuscarUnUsuario);
                    return [3 /*break*/, 13];
                case 9: return [4 /*yield*/, inquirer.prompt(preguntaParaEliminar)];
                case 10:
                    respuestaPreguntaParaEliminar = _b.sent();
                    console.log(respuestaPreguntaParaEliminar.nombreABuscar);
                    return [4 /*yield*/, borrarUsuario(respuestaPreguntaParaEliminar.nombreABuscar)];
                case 11:
                    respuestaEliminarUsuario = _b.sent();
                    console.log(respuestaEliminarUsuario);
                    return [3 /*break*/, 13];
                case 12: return [3 /*break*/, 13];
                case 13: return [3 /*break*/, 15];
                case 14:
                    e_1 = _b.sent();
                    console.log('HUBO UN ERROR');
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function inicilizarBase() {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoLeido) {
            if (error) {
                fs.writeFile(nombreArchivo, '{"usuarios":[],"juegos":[]}', function (error) {
                    if (error) {
                        reject({ mensaje: 'HUBO UN ERROR AL CREAR EL ARCHIVO' });
                    }
                    else {
                        resolve({ mensaje: 'ok' });
                    }
                });
            }
            else {
                resolve({ mensaje: 'ok' });
            }
        });
    });
}
;
function añadirDatosALaBase(usuarioIngresarEnLaBase) {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoLeido) {
            if (error) {
                reject({ mensaje: 'ERROR AL LEER EL ARCHIVO' });
            }
            else {
                //jason parse-->para transformar de STRING a objeto JSON
                var bddJSONPARSE = JSON.parse(contenidoLeido);
                bddJSONPARSE.usuarios.push(usuarioIngresarEnLaBase);
                fs.writeFile(nombreArchivo, JSON.stringify(bddJSONPARSE), function (error) {
                    if (error) {
                        reject({ mensaje: 'ERROR AL ESCRIBIR EL ARCHIVO' });
                    }
                    else {
                        resolve({ mensaje: 'USUARIO AÑADIDO EN LA BASE' });
                    }
                });
            }
        });
    });
}
;
function buscarUsuario(nombreUsuarioABuscar) {
    console.log(nombreUsuarioABuscar);
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoLeido) {
            if (error) {
                reject({ mensaje: 'ERROR AL LEER EL ARCHIVO' });
            }
            else {
                var bddJSONPARSE = JSON.parse(contenidoLeido);
                console.log(bddJSONPARSE);
                var resultadoFindIndex = bddJSONPARSE.usuarios.find(function (bddJSONPARSE) {
                    return bddJSONPARSE.nombreUsuario === nombreUsuarioABuscar;
                });
                resolve(resultadoFindIndex);
            }
        });
    });
}
;
function borrarUsuario(nombreUsuarioAEliminar) {
    console.log(nombreUsuarioAEliminar);
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoLeido) {
            if (error) {
                reject({ mensaje: 'ERROR AL LEER EL ARCHIVO' });
            }
            else {
                var bddJSONPARSE = JSON.parse(contenidoLeido);
                console.log(bddJSONPARSE);
                var resultadIndexOf = bddJSONPARSE.usuarios.indexOf(nombreUsuarioAEliminar);
                var resultadoSplice = bddJSONPARSE.usuarios.splice(resultadIndexOf, 1);
                fs.writeFile(nombreArchivo, JSON.stringify(bddJSONPARSE), function (error) {
                    if (error) {
                        reject({ mensaje: 'ERROR AL ESCRIBIR EL ARCHIVO' });
                    }
                    else {
                        resolve({ mensaje: 'SE REESRIBIO EXITOSAMENTE' });
                    }
                });
                resolve({ mensaje: 'SE ELIMINO Y REESCRIBIO EXITOSAMENTE' });
            }
        });
    });
}
function actualizarUsuario() {
}
main();
