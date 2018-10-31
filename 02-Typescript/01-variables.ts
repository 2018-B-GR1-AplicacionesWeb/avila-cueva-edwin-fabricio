const nombre : string = " ";
const edad : number = 23;
const nada : string = null;
const casado : boolean = true;
let loQueSea : any = {};
loQueSea = 1;
loQueSea = 'facil';
loQueSea = true;

//Deifinicion de clases
const fechaNacimiento : Date = new Date();

let identificador : number | string = '1';
identificador = 1;
identificador = 'uno';


//los dos puntos es el tipo y el igual es el jason
//LAS interefaces sirvesn para definir el tipo de las variables
interface UsuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number | string;
}

class Usuario {
    public nombre : string;
    public apellido : string;
    public edad? : number | string;
}

const usuario : Usuario ={
    nombre: 'Edwin',
    apellido: 'Avila'
};

usuario.edad = 2;
// el signo de pregunta es que ese parametro es opcional


// funciones ---------

function sumarDosNumeros(numeroUno : number, numeroDos : number) {
    return numeroDos + numeroUno;
}

sumarDosNumeros(2,2);

const  saludar = (nombre:string, apellido?:string, ...infinito:number[]):string =>{
    return 'hola';
};

const respuesta = saludar('edwin','cueva',1,2,3,4);

const nombreDos = 'Edwin';
nombreDos = 2;


