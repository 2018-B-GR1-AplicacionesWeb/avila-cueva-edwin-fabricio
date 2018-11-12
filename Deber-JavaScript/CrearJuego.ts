declare var Promise: any;
export function crearJuegos(juegos:any,juegoNuevo:any) {
    juegos.push(juegoNuevo);
    return new Promise(
        (resolve, reject) => {
            resolve({
                juegos
            });
            reject({
                mensaje: 'NO SE CREO USUARIO'
            });
        }
    )
};
