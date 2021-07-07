const inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require ('fs');
const paqueteRecursos = require('./PaquetesRecursos');
const paqueteFunciones = require('./PaquetesFunciones');


//////////////////////PROMESA-PETICION-DATOS/////////////////////////////
const ingresarDatos = (preguntasEnLaConsola)=>{
    return new Promise(
        (resolve,reject)=>{
            resolve(
                inquirer
                    .prompt(preguntasEnLaConsola)
                    .then((respuestasDeLasPreguntas) => {
                        return respuestasDeLasPreguntas;
                    })
            )
        }
    )

};

///////////////////////////////INICIO//////////////////////////////
ingresarDatos(paqueteRecursos.opciones).then(
    (respuestaPromesaIngresarDatos)=>{
        if(respuestaPromesaIngresarDatos.opciones === 'Crear'){
            console.log('ya')
            ingresarDatos(paqueteRecursos.preguntasDelJuegoACrear)
                .then((respuestaDePreguntasDelJuegoACrear)=>{
                    paqueteFunciones.funcionLeer('BaseDeJuegos.json',respuestaDePreguntasDelJuegoACrear)
                        .then(
                            (respuestaPromesaFuncionLeerThen)=>{
                                const arreglo = JSON.parse("[" + respuestaPromesaFuncionLeerThen.contenidoArchivo+ "]");
                                arreglo.push(respuestaPromesaFuncionLeerThen.respuestas);
                                paqueteFunciones.funcionEscribir(respuestaPromesaFuncionLeerThen.nombreArchivo,JSON.stringify(arreglo));
                            }
                        )
                        .catch(
                            (respuestaPromesaFuncionLeerCatch)=>{
                                paqueteFunciones.funcionEscribir(respuestaPromesaFuncionLeerCatch.nombreArchivo,JSON.stringify(respuestaPromesaFuncionLeerCatch.respuestas));
                            }
                        )
                })
        }

    }
).catch(
    (respuetasError)=>{
        return 'ERROR';
    }
)





