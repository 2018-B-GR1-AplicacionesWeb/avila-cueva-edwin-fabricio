import {from} from "rxjs";
declare var require;
const menu = require ('console-menu');
import {paquetesFunciones} from './PaqueteFunciones';
import {arregloJuegos, tipoDeClasificacion, tiposDeJuegos} from './PaqueteRecursos';
import {funcionPREUBA}from './prueba';


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
                    paquetesFunciones.crearJuegos(arregloJuegos,funcionPREUBA())
                        .then(
                            (respuestaPromesa)=>{
                                console.log( respuestaPromesa);
                            }
                        )
                        .catch(
                            (respuestaPromesaError)=>{
                                return respuestaPromesaError;
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
