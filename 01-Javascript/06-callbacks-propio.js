const fs = require('fs');


let totalArchivo = 'INICIO';

//funcion para enviar, el nombre del archivo y el texto añadir
function appendFile(nombreArchivo, contenidoArchivo,callback) {
    //1ro leer si exite el archivo, es decir leer
    //Si existe leer el contenido
    //sobre escribie el contenido dewl archivo nuevo con el antiguo


    //parametros nombre del archivo, idima, y el coallback
    fs.readFile(nombreArchivo,'utf-8',
        (error,contenidoArchivoLeido)=>{
        if(error){
            //si no hay archivo, creamos el archivo con write
            fs.writeFile(nombreArchivo, contenidoArchivo,
                (err)=>{
                    if(err){
                        console.error('Error escribiendo');
                        callback(undefined,err);
                    }else{
                        console.error('Archivo Creado');
                        callback(contenidoArchivo);

                    }
                }
            );
        }else {
            fs.writeFile(nombreArchivo, contenidoArchivoLeido +contenidoArchivo,
                (err)=>{
                    if(err){
                        console.error('Error escribiendo');
                        callback(undefined,err);
                    }else{
                        console.error('Archivo Creado');
                        callback(contenidoArchivoLeido+contenidoArchivo)
                    }
                }
                );
            }
        }
    );
}

appendFile('06-texto.txt', '\n Adios Mundo',
        (contenidoArchivo,error)=>{
    //queremos uque no desvuelva el contendio del archivo
            if(error){
            console.log('ERROR', error);
            }else{
                console.log('-')
            }
        }
     );