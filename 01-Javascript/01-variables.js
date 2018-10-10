//Tipados int edad =1;

var edad = 1;
console.log('Variable Edad',typeof edad);//number

var sueldo = 1.01;
console.log('Variable Sueldo',typeof sueldo);//number

var  nombre = 'Edwin';
console.log('Variable Nombre',typeof nombre); //String

var  casado = false;
console.log('Variable Casado',typeof casado);//Boolean

var hijos = null;
console.log('Variable hijos',typeof hijos);//Object

var cuatroBrazos;
console.log('Variable CuatroBrazos valor',cuatroBrazos);//undefiened : no esta asginado ningún valor
console.log('Variable CuatroBrazos tipo',typeof cuatroBrazos);

var fecha = new Date();
console.log('FECHA valor',fecha);
console.log('FECHA tipo',typeof fecha);

// TIPO DE DATOS  OBJETO

var edwinJSON = {
    "nombre":"Edwin",
    "apellido": "Avila",
    "edad": 23,
    "sueldo": 0.0,
    "casado": false,
    "hijos": null,
    "mascota":{
        "nombre":"Cachetes"
    }
};

var edwin ={
    nombre: 'Edwin',
    'edad': 23,
    "apellido": "Avila",
    casado: false,
    hijos: null,
    deberes: undefined,
    mascota:{
        nombre:"Cachetes"
    },
};

//Como acceder
console.log(edwin.nombre)

// Usar el if y else
if(true){
    console.log("Si")
}else{
    console.log("No")
}

if(false){
    console.log("Si")
}else{
    console.log("No")
}

//truhty: -1 , 1 , String numero excepto el cero, object
//falsy : 0 , null, undefined
if(null){
    console.log("Si")
}else{
    console.log("No")
}

