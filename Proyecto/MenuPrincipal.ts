declare var  require;
const inquirer = require('inquirer');
const fs = require ('fs');
import {opcionesMenu,tipoDeClasificacion,tiposDeJuegos} from './PaqueteRecursos';
declare var Promise:any;

const opciones = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: opcionesMenu },
];

inquirer
    .prompt(opciones)
    .then((respuestas) => {
        if (respuestas.opciones === 'Crear'){
            const preguntasFormulario = [
                { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
                { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
                { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: tiposDeJuegos },
                { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:'},
                { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: tipoDeClasificacion},
            ];
            inquirer
                .prompt(preguntasFormulario)
                .then((respuestasFormulario) => {
                        console.log(respuestasFormulario)
                        funcionEscritura(respuestasFormulario.nombreDelJuego,JSON.stringify(respuestasFormulario));
                    }
                );
        }if(respuestas.opciones == 'Borrar'){
            const preguntaParaBorrar = [
                { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere borrar?' }];
            inquirer
                .prompt(preguntaParaBorrar)
                .then((respuestaParaBorrar) => {
                        funcionBorrar(respuestaParaBorrar.nombreDelJuego);
                    }
                )
        }
    });


const funcionEscritura = (nombreDelArchivo,respuestasDeLasPreguntas)=>{
    fs.writeFile(nombreDelArchivo,respuestasDeLasPreguntas,
        (error)=> {
            return new Promise(
                (resolve,reject)=>{
                    if(error){
                        reject({
                            mensaje:'ERROR DE CREAR ARCHIVO',
                        })
                    }else {
                        resolve ({
                            mensaje: 'SE CREO EXITOSAMENTE'
                        })
                    }
                }
            )
        });
};


const funcionBorrar =(nombreDelArchivo)=> {
    fs.unlink(nombreDelArchivo, (err) => {
        return new Promise(
            (resolve, reject) => {
                if (err) {
                    reject({
                        mensaje: 'ERROR AL ELIMINAR'
                    })
                } else {
                    resolve({
                        mensaje: 'SE ELIMINO EXITOSAMENTE'
                    });
                }
            });
    });
};

const funcionActualizar =  ()=>{

}












