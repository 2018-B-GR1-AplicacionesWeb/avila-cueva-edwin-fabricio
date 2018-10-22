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

//Tercera forma



//operadores

var arregloDeNombres = ['A', 'b','c'];

arregloDeNombres.forEach(function () {

});