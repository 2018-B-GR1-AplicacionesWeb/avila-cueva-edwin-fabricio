/*holaMundo();
function holaMundo() {
    console.log('Hola Mundo');
}*/
//si no existe un return devuelve UNDEFINED

//CALLBACKS
//Gestor de paquetes npm

/*const fs = require ('fs');
fs.readFile('./repasoArreglos.js','utf-8',
            (error,contenidoArchivo)=>{
                if(error){
                    console.error(error);
                    throw new Error (error);
                }else {
                    console.log(contenidoArchivo);
                }

            }
        );
*/

/*const fs = require ('fs');
fs.writeFile('archivo','Contenido en el archivo',
                function (error) {
                    if(error){
                        console.log('ERROR');
                    }else {
                        console.log('Se creo Archivo')
                    }

                }
            );
*/

/*
const fs = require ('fs');
fs.readFile('archivo1','utf-8',
    (error,contenidoArchivo)=>{
        if(error){
            fs.writeFile('archivo1','Contenido QUE SE ESCRIBIÓ en el archivo',
                function (error) {
                    if(error){
                        console.log('ERROR');
                    }else {
                        console.log('Se creo Archivo')
                    }

                }
            );
        }else {
            console.log(contenidoArchivo);
        }

    }
);
*/
/*
const fs = require('fs');
let totalArchivo = 'INICIO';

function appendFile(nombreArchivo,contenidoArchivo,callback) {

    fs.readFile(nombreArchivo,'utf-8',
        (error,contenidoArchivoLeido)=>{
            if(error){
                //si no hay archivo, creamos el archivo con write
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err)=>{
                        if(err){
                            console.error('Error escribiendo');
                        }else{
                            console.error('Archivo Creado');
                                callback(contenidoArchivo);
                        }
                    }
                );
            }else {//escribimos nuevamente sobre el archivo más el nuevo contenido
                fs.writeFile(nombreArchivo, contenidoArchivoLeido +contenidoArchivo,
                    (err)=>{
                        if(err){
                            console.error('Error escribiendo');

                        }else{
                            console.error('Archivo Creado');
                            callback(contenidoArchivo+contenidoArchivoLeido);
                        }
                    }
                );
            }
        }
    );
}


appendFile('archivo1','\n texto NUEVO QUE VA EN EL ARCHIVO \n',
            (contenidoArchivo)=> {
                    console.log(contenidoArchivo);
            }
    );
*/
////////////////PROMESAS////////////////////////////

/*const promesita = new Promise(
    (resolve,reject)=>{
        resolve(
            {
                nombre:'edwin',
            }
        );
    }
);

promesita.
    then(
        (respuestaPromesa)=>{
            console.log(respuestaPromesa)
        }
    )
    .catch(
        (respuestaPromesaError)=> {
            console.log(respuestaPromesaError)
        }
    )


*/


/*
const fs = require ('fs');
const promesa = new Promise(
    (resolve, reject)=>{
fs.readFile('archivods1','utf-8',
    (err,contenidoArchivo)=>{
    if(err){
        reject(err);
    }else{
        resolve(contenidoArchivo);
    }
    }
    )
    }
);

promesa.then(
    (resultadoPromesa)=>{
        console.log(resultadoPromesa)
    }
)
    .catch(
        (respuestaPromesaError)=> {
            console.log(respuestaPromesaError)
        }
    )


*/




