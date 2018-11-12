"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require('inquirer');
const PaqueteRecursos_1 = require("./PaqueteRecursos");
const preguntas = [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:', choices: true },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:', choices: true },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: PaqueteRecursos_1.tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:', choices: true },
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: PaqueteRecursos_1.tipoDeClasificacion },
];
const respuetaDeLoEscrito = inquirer
    .prompt(preguntas)
    .then(function (respuetas) {
    return respuetas;
});
