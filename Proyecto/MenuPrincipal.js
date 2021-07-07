"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const rxjs = require('rxjs');
const PaqueteRecursos_1 = require("./PaqueteRecursos");
const PaqueteFunciones_1 = require("./PaqueteFunciones");
inquirer
    .prompt(PaqueteRecursos_1.opciones)
    .then((respuestas) => {
    if (respuestas.opciones === 'Crear') {
        inquirer
            .prompt(PaqueteRecursos_1.preguntasFormulario)
            .then((respuestasFormulario) => {
            console.log(respuestasFormulario);
            PaqueteFunciones_1.funcionEscritura(respuestasFormulario.nombreDelJuego, JSON.stringify(respuestasFormulario));
        });
    }
    ;
    if (respuestas.opciones === 'Borrar') {
        inquirer
            .prompt(PaqueteRecursos_1.preguntaParaBorrar)
            .then((respuestaParaBorrar) => {
            PaqueteFunciones_1.funcionBorrar(respuestaParaBorrar.nombreDelJuego);
        });
    }
    ;
    if (respuestas.opciones === 'Actualizar') {
        inquirer
            .prompt(PaqueteRecursos_1.preguntaParaActualizar)
            .then((respuestasParaActualizar) => {
            PaqueteFunciones_1.funcionActualizar(respuestasParaActualizar.nombreDelJuego, JSON.stringify(respuestasParaActualizar));
        });
    }
    ;
    if (respuestas.opciones === 'Buscar') {
        inquirer
            .prompt(PaqueteRecursos_1.preguntaParaBuscar)
            .then((respuestaParaBuscar) => {
            PaqueteFunciones_1.funcionBuscar(respuestaParaBuscar.nombreDelJuego);
        });
    }
    ;
});
