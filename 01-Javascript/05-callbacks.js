const fs = require ('fs');
console.log('Inicio')
fs.readFile('04-operadores.js','utf-8',(err,contenidoArchivo)=>{
    if(err){//para que salga un error pero continuar con el codpgi lo metemos dentro de try
        console.error(error);
        try{
        throw new Error (error);
        }catch (e){
            console.log(e)
        };
        console.log('Extra');
    }else{
    console.log('Si sirvió');
    }
});
console.log('Fin');