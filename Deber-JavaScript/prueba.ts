declare var  require;
var inquirer = require('inquirer');
import {tiposDeJuegos,tipoDeClasificacion} from "./PaqueteRecursos";

const preguntas = [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:', choices: true },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:', choices: true },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:', choices: true },
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: tipoDeClasificacion},
   ];

const respuetaDeLoEscrito = inquirer
    .prompt(preguntas)
    .then(function (respuetas) {
        return respuetas;
    });




