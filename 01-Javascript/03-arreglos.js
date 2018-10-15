var arreglo = [];

arreglo = [1,
    "2",
    'hola',
    false,
    null,
    new Date(),
    {nombre:'Edwin'},[1,2,3,]
    ];

//Aumentar algo al arreglo
console.log('Arreglo Original',arreglo);
arreglo.push(3);
console.log('Arreglo Modificaco',arreglo);
arreglo.pop();
console.log('Arreglo Modificaco2',arreglo);

var arregloNumeros = [1,2,3,4,5];
//remueve elementos y puede meter elementos si es necesario
//vamos a meter el 1.1
arregloNumeros.splice(1,0,1.1);
console.log('Meter por splice: ',arregloNumeros)
//para elimnar el indice es desde donde empiza
arregloNumeros.splice(4,1);
console.log('Splice para eliminar:', arregloNumeros);


//Buscar el indice del objeto el 2
var indiceNumeroDos = arregloNumeros.indexOf(2);
console.log(arregloNumeros.indexOf(2));

//Agregar elementos
arregloNumeros.splice(indiceNumeroDos,0, 1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9);
console.log(arregloNumeros);

//Buscar el numero
var indiceUnoSiete = arregloNumeros.indexOf(1.7);
console.log(arregloNumeros[indiceUnoSiete]);

//eliminar del 1.1 al 1.9
//posision inicial, desdeel uno uno al uno punto 1.9
var posicionInicialUno = arregloNumeros.indexOf(1.1);
var posicionIncialUnoNueve = arregloNumeros.indexOf(1.9);
var desdeElunounoAlunoNueve = (posicionIncialUnoNueve - posicionInicialUno)+1;
arregloNumeros.splice(posicionInicialUno,desdeElunounoAlunoNueve);

console.log(arregloNumeros);

//UNIR DOS O MÁS ARREGLOS
var arregloUno = [1,2,3];
var arregloDos = [4,5,6];

//Destructuración de arreglos
//es igual a desplegar 1,2,3
console.log(...arregloUno);

var arregloCompleto = [...arregloUno,...arregloDos];
console.log(arregloCompleto);

//Destructuración de obejtos

var edwin = {
    nombre :'Edwin',
    apellido:'Avila',
    direccion:'Av.Libertadores',
    casado: false,
    edad: 23
};

var vicente={
    mascota:{
        nombre:'cachetes'
    },
    fechanacimento: new Date('1995-02-02')
};


var datosDelUsuario ={
    ...edwin,
    ...vicente
}

console.log(datosDelUsuario);


// OBJETOS

var atributosDelObjeto = Object.keys(datosDelUsuario);

console.log(atributosDelObjeto);

console.log(datosDelUsuario['nombre']);