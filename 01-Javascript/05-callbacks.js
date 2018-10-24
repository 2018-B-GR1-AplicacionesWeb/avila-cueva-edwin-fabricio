const fs = require ('fs');

const contenidoAAgregar = 'Edwin \n';
const nombreArchivo = '04-operadores.js';

console.log('Inicio')
fs.readFile(nombreArchivo,'utf-8',(err,contenidoArchivo)=>{
    if(err){//para que salga un error pero continuar con el codpgi lo metemos dentro de try
        console.error(error);
        try{
        throw new Error (error);
        }catch (e){
            console.log(e)
        };
        console.log('Extra');
    }else{
    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err)=>{
        if(err)throw err;
        
    })
    }
});
console.log('Fin');