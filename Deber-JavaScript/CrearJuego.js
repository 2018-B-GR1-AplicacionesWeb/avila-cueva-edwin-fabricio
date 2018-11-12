"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function crearJuegos(juegos, juegoNuevo) {
    juegos.push(juegoNuevo);
    return new Promise((resolve, reject) => {
        resolve({
            juegos
        });
        reject({
            mensaje: 'NO SE CREO USUARIO'
        });
    });
}
exports.crearJuegos = crearJuegos;
;
