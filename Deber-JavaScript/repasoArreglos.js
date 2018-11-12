//Ejemplo
const arreglo =  [1,23,4,5,6,7];

//Para añadir
arreglo.push(100);
//añade al último el número
console.log(arreglo);

//Para Eliminar
arreglo.pop();
//elimina el último
console.log(arreglo);

//Agregar un numero en cualquier lado, o remover elementos del arreglo
//agregar el 900-->star : el indice:4,borrar :0,agregar:900
arreglo.splice(4,0,900);
console.log(arreglo);
//eliminar
arreglo.splice(0,3);
console.log(arreglo);

const arreglo2 = [1,1,2,3,4,5,6,6,7];

//para poder ver el indice de un arreglo sabiendo el valor
var indiceDelNumeroDos = arreglo2.indexOf(7);
console.log(indiceDelNumeroDos);

//sumar los dos arreglos
//Destructuracipon de arreglos
var arregloUno = [1,2,3];
var arregloDos = [4,5,6];
console.log(...arregloUno);
var arregloCompleto = [...arregloUno,...arregloDos];





