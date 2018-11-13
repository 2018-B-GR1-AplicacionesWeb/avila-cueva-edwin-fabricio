"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const rxjs = require('rxjs');
const PaqueteRecursos_1 = require("./PaqueteRecursos");
const PaqueteFunciones_1 = require("./PaqueteFunciones");
const opciones = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: PaqueteRecursos_1.opcionesMenu },
];
inquirer
    .prompt(opciones)
    .then((respuestas) => {
    if (respuestas.opciones === 'Crear') {
        const preguntasFormulario = [
            { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
            { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
            { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: PaqueteRecursos_1.tiposDeJuegos },
            { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:' },
            { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: PaqueteRecursos_1.tipoDeClasificacion },
        ];
        inquirer
            .prompt(preguntasFormulario)
            .then((respuestasFormulario) => {
            console.log(respuestasFormulario);
            PaqueteFunciones_1.funcionEscritura(respuestasFormulario.nombreDelJuego, JSON.stringify(respuestasFormulario));
        });
    }
    ;
    if (respuestas.opciones === 'Borrar') {
        const preguntaParaBorrar = [
            { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere borrar?' }
        ];
        inquirer
            .prompt(preguntaParaBorrar)
            .then((respuestaParaBorrar) => {
            PaqueteFunciones_1.funcionBorrar(respuestaParaBorrar.nombreDelJuego);
        });
    }
    ;
    if (respuestas.opciones === 'Actualizar') {
        const preguntaParaActualizar = [
            { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere actulizar?' },
            { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
            { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: PaqueteRecursos_1.tiposDeJuegos },
            { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:' },
            { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: PaqueteRecursos_1.tipoDeClasificacion },
        ];
        inquirer
            .prompt(preguntaParaActualizar)
            .then((respuestasParaActualizar) => {
            PaqueteFunciones_1.funcionActualizar(respuestasParaActualizar.nombreDelJuego, JSON.stringify(respuestasParaActualizar));
        });
    }
    ;
    if (respuestas.opciones === 'Buscar') {
        const preguntaParaBuscar = [
            { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere buscar?' }
        ];
        inquirer
            .prompt(preguntaParaBuscar)
            .then((respuestaParaBuscar) => {
            PaqueteFunciones_1.funcionBuscar(respuestaParaBuscar.nombreDelJuego);
        });
    }
    ;
});
