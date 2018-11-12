"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu = require('console-menu');
const inquirer = require('inquirer');
const PaqueteFunciones_1 = require("./PaqueteFunciones");
const PaqueteRecursos_1 = require("./PaqueteRecursos");
const ejecutarMenuPrincipal = () => {
    const menuSeleccion = [
        { hotkey: '1', title: 'Ingresar al Sistema', data: { nombre: 'IngresarAlSistema' } },
        { hotkey: '2', title: 'Salir del Sistema', data: { nombre: 'SalirDelSistema' } },
    ];
    const configuracionesMenuPrincipal = {
        header: 'Bienvenidos a GameOver',
        border: true,
    };
    return menu(menuSeleccion, configuracionesMenuPrincipal)
        .then((itemSeleccionado) => {
        switch (itemSeleccionado.hotkey) {
            case '1':
                const preguntas = [
                    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:', choices: true },
                    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:', choices: true },
                    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: PaqueteRecursos_1.tiposDeJuegos },
                    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:', choices: true },
                    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: PaqueteRecursos_1.tipoDeClasificacion },
                ];
                const respuestaPromesaInquirer = () => {
                    inquirer
                        .prompt(preguntas)
                        .then(function (respuetas) {
                        return respuetas;
                    });
                };
                PaqueteFunciones_1.paquetesFunciones.crearJuegos(PaqueteRecursos_1.arregloJuegos, respuestaPromesaInquirer)
                    .then((respuestaPromesa) => {
                    console.log(respuestaPromesa);
                })
                    .catch((respuestaPromesaError) => {
                    console.log(respuestaPromesaError);
                });
                break;
            case '2':
                console.log('Escogió la Opcion 2 Salir');
                break;
            default:
                console.log('Opcion Invalida');
        }
        ;
    });
};
ejecutarMenuPrincipal();
