"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
exports.funcionEscritura = (nombreDelArchivo, respuestasDeLasPreguntas) => {
    fs.writeFile(nombreDelArchivo, respuestasDeLasPreguntas, (error) => {
        return new Promise((resolve, reject) => {
            if (error) {
                reject({
                    mensaje: 'ERROR DE CREAR ARCHIVO',
                });
            }
            else {
                resolve({
                    mensaje: 'SE CREO EXITOSAMENTE'
                });
            }
        });
    });
};
exports.funcionBorrar = (nombreDelArchivo) => {
    fs.unlink(nombreDelArchivo, (err) => {
        return new Promise((resolve, reject) => {
            if (err) {
                reject({
                    mensaje: 'ERROR AL ELIMINAR'
                });
            }
            else {
                resolve({
                    mensaje: 'SE ELIMINO EXITOSAMENTE'
                });
            }
        });
    });
};
exports.funcionActualizar = (nombreDelArchivo, respuestasDeLasPreguntas) => {
    fs.writeFile(nombreDelArchivo, respuestasDeLasPreguntas, (error) => {
        return new Promise((resolve, reject) => {
            if (error) {
                reject({
                    mensaje: 'ERROR AL ACTUALIZAR EL ARCHIVO',
                });
            }
            else {
                resolve({
                    mensaje: 'SE ACTUALIZÓ CORRECTAMENTE'
                });
            }
        });
    });
};
exports.funcionBuscar = (nombreDelArchivo) => {
    fs.readFile(nombreDelArchivo, 'utf-8', (error, contenidoArchivo) => {
        return new Promise((resolve, reject) => {
            if (error) {
                reject({
                    mensaje: 'ERROR AL BUSCAR EL ARCHIVO',
                });
            }
            else {
                resolve(console.log(contenidoArchivo));
            }
        });
    });
};
