// 07 promesas.js
/*

//Recibe una funcion como parametro
const nuevaPromesa = new Promise(
    (resolve,reject)=>{
        reject();
    }
);

console.log(nuevaPromesa);
nuevaPromesa
    .then(  //-->esto salio bien
    ()=>{
        console.log('Todo Bien');
        }
    )
    .catch(
    ()=>{
        console.log('Algo malo paso');
    }
);
*/
//---------------------------------
const fs = require('fs');
/*
const nuevaPromesa = new Promise(
    (resolve,reject)=>{
        fs.readFile('06-texto.txt', 'utf-8',
            (err,contenidoArchivo)=>{
                if(err){
                    reject(err);
                }else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

console.log(nuevaPromesa);
nuevaPromesa
    .then(  //-->esto salio bien
        (resulatadoOK)=>{
            console.log('Todo Bien',resulatadoOK);
        }
    )
    .catch(
        (resultadoERROR)=>{
            console.log('Algo malo paso',resultadoERROR);
        }
    );
*/

//---------------------------


const nuevaPromesaLectura = new Promise(
    (resolve)=>{
        fs.readFile('06-texto.txt', 'utf-8',
            (err,contenidoArchivo)=>{
                if(err){
                    resolve('');
                }else {
                    resolve(contenidoArchivo);
                }
            });
    })



const nuevaPromesaEscritura = (contenidoLeido)=> {
    return new Promise(
        (resolve, reject) => {
            const contenido = contenidoLeido ? contenidoLeido + 'otro lo que sea' : 'otro ola qie no es ledio';
            fs.writeFile('06-texto.txt', 'WEB',
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('WEB');
                    }
                });
        }
    )
}
    console.log(nuevaPromesaLectura);
    nuevaPromesaLectura
        .then(  //-->esto salio bien
            (contenidoArchivo) => {
                console.log('Todo Bien', contenidoArchivo);
                return nuevaPromesaEscritura(contenidoArchivo);
            }
        )
        .then(
            (contenidCompleto) => {
                console.log('Completo', contenidCompleto);
            }
        )
        .catch(
            (resultadoError) => {
                console.log('algo malo', resultadoError);
            }
        )



const promesaAppendFile = (nombreArchivo,contenidoArchivo)=>{
        return new Promise(
            (resolve, reject) => {
                fs.readFile(nombreArchivo,'utf-8',
                    (error,contenidoArchivoLeido)=>{
                        if(error){
                            //si no hay archivo, creamos el archivo con write
                            fs.writeFile(nombreArchivo, contenidoArchivo,
                                (err)=>{
                                    if(err){
                                        console.error('Error escribiendo');
                                        reject(err)
                                    }else{
                                        console.error('Archivo Creado');
                                        resolve(contenidoArchivo)

                                    }
                                }
                            );
                        }else {
                            fs.writeFile(nombreArchivo, contenidoArchivoLeido +contenidoArchivo,
                                (err)=>{
                                    if(err){
                                        console.error('Error escribiendo');
                                        reject(err)
                                    }else{
                                        console.error('Archivo Creado');
                                        resolve(contenidoArchivoLeido +contenidoArchivo)
                                    }
                                }
                            );
                        }
                    }
                );
            }
        )
}


console.log(promesaAppendFile);
nuevaPromesaLectura
    .then(  //-->esto salio bien
        (nomnreAr,contenidoArchivo) => {
            console.log('Todo Bien', contenidoArchivo);
            return promesaAppendFile(contenidoArchivo);
        }
    )
    .then(
        (contenidCompleto) => {
            console.log('Completo', contenidCompleto);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('algo malo', resultadoError);
        }
    )

