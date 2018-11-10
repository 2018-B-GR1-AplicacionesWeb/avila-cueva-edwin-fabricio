//import {paquete Uno, paquete DOS} from 'rxjs';
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const disctinct = require('rxjs/operators').distinct;
const observableUnos$ = rxjs.of([1, 2, 3], "hola", 3, true, { nombre: 'EDWIN' }, new Date(), 3, 3, 3, 3);
//en el parentesis es lo que mandamos
//rxjs.of devuelve un observable
console.log(observableUnos$);
observableUnos$
    .pipe(disctinct(), map((valor) => {
    console.log('Valor', valor);
    return {
        data: valor
    };
}))
    .subscribe((ok) => {
    console.log(ok);
}, (error) => {
    console.log(error);
}, () => {
    console.log('Completado');
}); //acpeta dos funciones como el punto then y el punto catch
//rxjs.from() solo acepta promesas
const promesita = () => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        resolve(':)');
    });
};
//hacklife
async function ejecutarCodigoSyncrono() {
    console.log('Inicio');
    //Promesa --> ejecutar
    try {
        const resultadoPromesita = await promesita();
        console.log(resultadoPromesita);
    }
    catch (e) {
        console.log('Error en la promesita', e);
    }
    console.log('Fin');
}
ejecutarCodigoSyncrono();
/*
const observableDePromesa$ = rxjs.from(promesita());

observableDePromesa$
    .pipe(
        map(
            (valor) => {
                return {
                    data: valor
                }
            }
        )
    )
    .subscribe(
        (objetoFeliz) => {
            console.log(objetoFeliz);
        },
        (error) => {
            console.log(error);
        }
    );
*/ 
