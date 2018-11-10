const fs = require('fs');

const arregloRespuestas = [];

const arregloStrings = ['A','B','C']

function ejercicioDeArchivos(arregloStrings,callback) {
    arregloStrings.forEach(
        (string, indice)=>{
            const archivo = `${indice}-${string}.txt`;
            const contenido = string;
            fs.writeFile(archivo,
                contenido,
                (err)=>{
                    const respuesta ={
                        nombreArchivo: archivo,
                        contenidoArchivo: contenido,
                        error: err
                    };
                    arregloRespuestas.push(respuesta);
                    const tamamoRespuestas = arregloRespuestas.length;
                    if(tamamoRespuestas === arregloStrings.length ){
                        callback(arregloRespuestas)
                    }
                }
            );
        }
    );
}
ejercicioDeArchivos(arregloStrings,
    (arregloRespuestas)=>{
    console.log(arregloRespuestas);
});