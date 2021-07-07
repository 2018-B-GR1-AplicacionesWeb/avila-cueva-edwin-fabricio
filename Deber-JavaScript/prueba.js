"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs = require('rxjs');
var inquirer = require('inquirer');
const PaqueteRecursos_1 = require("./PaqueteRecursos");
const operators_1 = require("rxjs/operators");
const preguntas = [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: PaqueteRecursos_1.tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:' },
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: PaqueteRecursos_1.tipoDeClasificacion },
];
inquirer
    .prompt(preguntas)
    .then(function (respuetas) {
    const observableRespuesta$ = rxjs.of(respuetas);
    observableRespuesta$
        .pipe(operators_1.map((valor) => {
        return {
            data: valor
        };
    }))
        .subscribe((valor) => {
        console.log(valor);
    }, (error) => {
        console.log(error);
    });
});
/*const observableRespuesta$ = rxjs.of(respuetas);
observableRespuesta$
    .pipe(

    )
    .subscribe(
        (valor)=>{
            console.log(valor)

        }
        ,
        (error)=>{
            console.log(error)
        }

    );


*/ 
