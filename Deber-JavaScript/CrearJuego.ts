declare var Promise: any;
export const crearJuegos = (arreglosJuegos,nuevoJuego)=>{
    arreglosJuegos.push(nuevoJuego);
    return new Promise(
        (resolve, reject) => {
            resolve(
                arreglosJuegos
            );
            reject({
                mensaje: 'NO SE CREO JUEGO'
            });
        }
    )
};
