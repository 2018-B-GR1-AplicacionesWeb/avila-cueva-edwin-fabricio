declare var  require;
const inquirer = require('inquirer');
const rxjs = require('rxjs');
import {opcionesMenu,preguntaParaBorrar,tipoDeClasificacion,tiposDeJuegos,opciones,preguntasFormulario,preguntaParaActualizar,preguntaParaBuscar} from './PaqueteRecursos';
declare var Promise:any;
import {funcionEscritura,funcionBorrar,funcionActualizar,funcionBuscar} from './PaqueteFunciones';

inquirer
    .prompt(opciones)
    .then((respuestas) => {
        if (respuestas.opciones === 'Crear'){

            inquirer
                .prompt(preguntasFormulario)
                .then((respuestasFormulario) => {
                        console.log(respuestasFormulario)
                        funcionEscritura(respuestasFormulario.nombreDelJuego,JSON.stringify(respuestasFormulario));
                    }
                );
        };
        if(respuestas.opciones === 'Borrar'){

            inquirer
                .prompt(preguntaParaBorrar)
                .then((respuestaParaBorrar) => {
                        funcionBorrar(respuestaParaBorrar.nombreDelJuego);
                    }
                )
        };
        if(respuestas.opciones === 'Actualizar' ){

            inquirer
                .prompt(preguntaParaActualizar)
                .then((respuestasParaActualizar) => {
                        funcionActualizar(respuestasParaActualizar.nombreDelJuego,JSON.stringify(respuestasParaActualizar));

                    }
                )

        };
        if(respuestas.opciones === 'Buscar'){

            inquirer
                .prompt(preguntaParaBuscar)
                .then((respuestaParaBuscar) => {
                        funcionBuscar(respuestaParaBuscar.nombreDelJuego);
                    }
                )

        };

    });

