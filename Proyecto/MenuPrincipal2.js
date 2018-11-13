"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map = require('rxjs/operators').map;
const inquirer = require('inquirer');
const rxjs = require('rxjs');
const PaqueteRecursos_1 = require("./PaqueteRecursos");
const fs = require('fs');
const opciones = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: PaqueteRecursos_1.opcionesMenu },
];
inquirer
    .prompt(opciones)
    .then((respuestas) => {
    if (respuestas.opciones === 'Crear') {
        const preguntasFormulario = [
            { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
            { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' }
        ];
        inquirer
            .prompt(preguntasFormulario)
            .then((respuestasFormulario) => {
            const arreglosJueegos = [];
            const fe = JSON.stringify(respuestasFormulario);
            console.log(arreglosJueegos);
            fs.writeFile('Juegos2.json', fe, function (error) {
                if (error) {
                    console.log('ERROR');
                }
                else {
                    console.log('Se creo Archivo');
                }
            });
        });
    }
    if (respuestas.opciones === 'Actualizar') {
        fs.readFile('Juegos2.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                console.error(error);
                throw new Error(error);
            }
            else {
                const arregloet = JSON.parse("[" + contenidoArchivo + "]");
                console.log(arregloet);
                /*  fs.writeFile('Juegos1.txt',
                      function (error) {
                          if (error) {
                              console.log('ERROR');
                          } else {
                              console.log('Se creo Archivo')
                          }

                      })*/
            }
        });
    }
});
