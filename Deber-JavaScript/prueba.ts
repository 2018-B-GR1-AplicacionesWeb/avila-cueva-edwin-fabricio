import {observable} from "rxjs";

declare var  require;
const rxjs = require('rxjs');

var inquirer = require('inquirer');
import {tiposDeJuegos,tipoDeClasificacion} from "./PaqueteRecursos";
import {map} from "rxjs/operators";


const preguntas = [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del DeTipoJuego:' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del DeTipoJuego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de DeTipoJuego:', choices: tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:'},
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del DeTipoJuego:', choices: tipoDeClasificacion},
   ];
let respuestaObservable;
 inquirer
    .prompt(preguntas)
     .then(
    function (respuetas) {
        respuestaObservable = respuetas;
    });


 const funcionHola=(respuestaObservable)=>{

}

/*const observableRespuesta$ = rxjs.of(respuetas);
        observableRespuesta$
            .pipe(
                map(
                    (valor)=>

                    {
                        return{
                        data:valor
                    }
                }
                )

            )
            .subscribe(
                (valor)=>{
                    console.log(valor)

                }
                ,
                (error)=>{
                    console.log(error)
                }

            );*/

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