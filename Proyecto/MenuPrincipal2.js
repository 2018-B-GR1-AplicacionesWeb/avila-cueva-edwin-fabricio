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
    if (respuestas.opciones === 'Añadir') {
        fs.readFile('Juegos2.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                console.error(error);
                throw new Error(error);
            }
            else {
                var arregloet = JSON.parse("[" + contenidoArchivo + "]");
                console.log(arregloet);
                const preguntasFormulario = [
                    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
                    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' }
                ];
                inquirer
                    .prompt(preguntasFormulario)
                    .then((respuestasFormulario) => {
                    console.log(respuestasFormulario);
                    console.log(arregloet);
                    arregloet.push(respuestasFormulario);
                    fs.writeFile('Juegos2.json', arregloet, function (error) {
                        if (error) {
                            console.log('ERROR');
                        }
                        else {
                            console.log('Se creo Archivo');
                        }
                    });
                });
            }
        });
    }
    if (respuestas.opciones === 'Buscar') {
        fs.readFile('Juegos2.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                console.error(error);
                throw new Error(error);
            }
            else {
                const arregloet = JSON.parse("[" + contenidoArchivo + "]");
                const preguntasBuscar = [
                    { type: 'input', name: 'nombreDelJuego', message: 'Que Juego quiere buscar:' },
                ];
                inquirer
                    .prompt(preguntasBuscar)
                    .then((respuestasBuscar) => {
                    console.log(arregloet
                        .find((valor) => {
                        return valor.nombreDelJuego === respuestasBuscar.nombreDelJuego;
                    }));
                });
            }
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
