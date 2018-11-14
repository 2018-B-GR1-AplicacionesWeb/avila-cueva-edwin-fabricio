const fs = require ('fs');
module.exports.funcionLeer = (nombreDelArchivo,respuestaPromesaDelJuegoACrear)=> {
    console.log('sds',respuestaPromesaDelJuegoACrear)
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreDelArchivo, 'utf-8',
                (error, contenidoDelArchivo) => {
                    if (error) {
                        reject(
                            data= {
                                nombreArchivo: nombreDelArchivo,
                                contenidoArchivo: contenidoDelArchivo,
                                respuestas:respuestaPromesaDelJuegoACrear
                            }
                        )

                    } else {
                        resolve(
                            data ={
                                nombreArchivo: nombreDelArchivo,
                                contenidoArchivo: contenidoDelArchivo,
                                respuestas:respuestaPromesaDelJuegoACrear
                            }

                        )
                    }
                }
            )
        }
    )
}


module.exports.funcionEscribir =(nombreArchivo,contenidoArchivo)=>{
fs.writeFile(nombreArchivo,contenidoArchivo,
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
    })

}



module.exports.funcionSoloLeer=(nombreArchivo)=>{
    fs.readFile(nombreArchivo,'utf-8',
        (error,contenidoArchivo)=>{
            if(error){
                console.error(error);
                throw new Error (error);
            }else {
                console.log(contenidoArchivo);
            }

        }
    );
}