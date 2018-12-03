

console.log('EDWIN ESTA SOLTERO');
const estado=false;


promesita(estado)
    .then(
        (resultadoPromesa)=>{
            console.log(resultadoPromesa);
        }
    ).catch(
    (resultadoPromesa)=>{
        console.log('estoy en el catch  ',resultadoPromesa);
    }
)


function promesita(parametroBOOLEAN) {
    return new Promise(
        (resolve,reject)=>{


            if (parametroBOOLEAN === true){
                resolve(
                    {
                        mensaje: 'ESTA BIEN ',
                    }
                );
            }else{
                reject(
                    {
                        mensaje: 'ESTA MAL',
                    }
                )
            }

        }
    )
}
