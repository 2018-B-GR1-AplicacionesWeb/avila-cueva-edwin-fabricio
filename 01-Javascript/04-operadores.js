//Primera forma
function ejemplo() {
}

console.log(typeof ejemplo);//Tipo de Dato- > Function
console.log(ejemplo);//Definicion de la función
console.log(ejemplo());//Ejecución de la función

//Segunda forma
var ejemplos = function(){}; // Anonymous function: NO TIENEN NOMBRE

var edwin={
    trabajar: function () {
        return 'Trabajando';
    }
}

//Podemos tener arreglos de funciones
var arregloFunciones = [function () {}];


//Tipo de declaraciones de variables
var variableUno; //Nunca Usar
let variableDos = 2; //usar mutable(este se asgina a otro valor)
variableDos = variableUno +1 ;
const pi = 3.1415;//intenten usar el const siempre --> Noes mutable



//operadores
const arregloDeNombres = ['A', 'b','C'];

/*const edwin ={
    nombre: 'Avila'
};
edwin.nombre = 'Fabricio';
*/
//Con const no se puede modificar el tipo de dato
//no se puede reasignar es poner el =, podemos ejecutar funciones
const casado = true;
//casado = false;

const apellido = 'Avila';
//apellido = 'Cueva';

const edad = 23;
//edad = 24;

//escribir codigo que se entienda
arregloDeNombres.forEach(function (valorActual,indiceActual, arreglo) {
    console.log('Valor Actual:', valorActual);
    console.log('Indice Actual:', indiceActual);
    console.log('Arreglo:', arreglo);
    }
);


//FAT Arrow functions
arregloDeNombres.forEach((valorActual,indiceActual, arreglo)=> {
        console.log('Valor Actual:', valorActual);
        console.log('Indice Actual:', indiceActual);
        console.log('Arreglo:', arreglo);
    }
);

// Formas de escribir la flecha gorda
const sumarDosNumeros = (numeroUno,numeroDos)=>{
    return numeroUno + numeroDos;
};

/*const sumarDosNumeros = (numeroUno,numeroDos)=>
    numeroUno + numeroDos;*/

const elevarAlCuadrado = (numero)=>numero*numero;

const elevarAlCuadradoV2 = numero=>numero*numero;

/////
const arregloNombresDos = ['E','F','G','H'];

//Mutar cada elemento del arreglo
const resultado = arregloNombresDos.map(valorActual=> {
    return valorActual+'.';
    }
).forEach(
    (valorNuevo)=>console.log(valorNuevo)
    );

console.log(resultado);

///////////////
const arregloNumeros = [2,3,4,5,6,7,8,9,10];

const resultadoFilter = arregloNumeros
    .filter(
        valorActual=>
            valorActual % 2 == 0//una expresion
    );
console.log(resultadoFilter);

if ('1' === 1){
    console.log('Verdad');
}else{
    console.log('Falso');
}

//Every
const resultadoEvery = arregloNumeros
    .every(n => n>6); // si todos elementos del arreglo cumple es TRUE / FALSE

console.log(resultadoEvery);

//Some si algguno cumple es verdadero

const  resultadoSome = arregloNumeros
    .some(n => n<2);// si uno cumple con la condicion es TRUE

console.log((resultadoSome))

//findIndex

const reusltadoFindIndex = arregloNumeros
    .findIndex(n => n === 7);
console.log(reusltadoFindIndex)

//find
const resultadoFind = arregloNumeros
    .find(n => n === 7);

console.log(resultadoFind)

//reduce

const resualtadoReduce = arregloNumeros
    .reduce(
        (valorActualDelNumero, valorActualDelArreglo)=>{//Primer parametro una función
            return valorActualDelNumero - valorActualDelArreglo;
        },
        100 // segundo parametro acepta un valor, donde empiez la operación
    );

console.log(resualtadoReduce)