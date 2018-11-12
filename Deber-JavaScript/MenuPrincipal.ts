import {crearJuegos} from "./CrearJuego";
declare var require;
const menu = require ('console-menu');
const inquirer = require('inquirer');
import {paquetesFunciones} from './PaqueteFunciones';
import {arregloJuegos, tipoDeClasificacion, tiposDeJuegos} from './PaqueteRecursos';


const ejecutarMenuPrincipal = ()=>{
    const menuSeleccion =[
        { hotkey: '1', title: 'Ingresar al Sistema', data: { nombre: 'IngresarAlSistema' } },
        { hotkey: '2', title: 'Salir del Sistema', data: { nombre: 'SalirDelSistema' } },
    ];

    const configuracionesMenuPrincipal = {
        header: 'Bienvenidos a GameOver',
        border: true,
    };

    return menu(menuSeleccion,configuracionesMenuPrincipal)
        .then((itemSeleccionado)=>{
            switch (itemSeleccionado.hotkey) {
                case '1':

                    const preguntas = [
                        { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:', choices: true },
                        { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:', choices: true },
                        { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: tiposDeJuegos },
                        { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:', choices: true },
                        { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: tipoDeClasificacion},
                    ];

                    const respuestaPromesaInquirer =()=>{
                        inquirer
                            .prompt(preguntas)
                            .then(function (respuetas) {
                                return respuetas;
                            });
                    };

                    paquetesFunciones.crearJuegos(arregloJuegos,respuestaPromesaInquirer)
                        .then(
                            (respuestaPromesa)=>{
                                console.log(respuestaPromesa)
                            }
                        )
                        .catch(
                            (respuestaPromesaError)=>{
                                console.log(respuestaPromesaError)
                            }
                        )

                    break;
                case '2':
                    console.log('Escogió la Opcion 2 Salir');
                    break;

                default:
                    console.log('Opcion Invalida');
            };
        });
};

ejecutarMenuPrincipal();
