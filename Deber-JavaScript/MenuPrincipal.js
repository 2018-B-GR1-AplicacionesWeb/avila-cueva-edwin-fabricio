"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu = require('console-menu');
const PaqueteFunciones_1 = require("./PaqueteFunciones");
const PaqueteRecursos_1 = require("./PaqueteRecursos");
const prueba_1 = require("./prueba");
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
                PaqueteFunciones_1.paquetesFunciones.crearJuegos(PaqueteRecursos_1.arregloJuegos, prueba_1.funcionPREUBA())
                    .then((respuestaPromesa) => {
                    console.log(respuestaPromesa);
                })
                    .catch((respuestaPromesaError) => {
                    return respuestaPromesaError;
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
