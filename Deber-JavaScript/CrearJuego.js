"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearJuegos = (arreglosJuegos, nuevoJuego) => {
    arreglosJuegos.push(nuevoJuego);
    return new Promise((resolve, reject) => {
        resolve(arreglosJuegos);
        reject({
            mensaje: 'NO SE CREO JUEGO'
        });
    });
};
