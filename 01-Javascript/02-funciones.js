holaMundo();

function holaMundo() {
    console.log('Hola Mundo');
}

console.log(holaMundo());//cuando no se tiene un return devuelveundefined

function sumarDosNumeros(numeroUnos, numeroDos) {
    var esNumberNumeroUno = typeof numeroUnos == 'number';
    var esNumberNumeroDos = typeof numeroDos == 'number';
    if(esNumberNumeroUno && esNumberNumeroDos){
        return numeroUnos + numeroDos;
    }else{
        console.error('NO ENVIA NUMEROS');
        return 0 ;
    }
};

console.log(sumarDosNumeros('t',3));


//
// SUMAR NUEMROS INFINITOS

function sumarNNumeros(...numeros) {
   var respuesta = sumarNumerosDesdeUnArreglo(numeros);
    if(respuesta.noEsNumber) {
        console.error('NO ENVIA NUMEROS');
        return 0;
    }
    else {
        return respuesta.resultado;
    }
};

function sumarNumerosDesdeUnArreglo(numeros){
    var resultado = 0;
    var tieneUnParametroDiferenteDeNumber = false;
    for (var i=0; i <numeros.length; i++){
        var esNumeroNumber = typeof numeros[i] == 'number';
        if(!esNumeroNumber){
            tieneUnParametroDiferentedeNumber = true;
        } else{
            resultado = resultado + numeros[i];
        }
    }
    var respuesta = {
        noEsNumber: tieneUnParametroDiferenteDeNumber,
        resultado: resultado
    }
    return respuesta;
}

console.log(sumarNNumeros(1,2,3,4,5));



//SALUDAR UPPACERCASE

function  saludarEnUpperCase(nombre,funcion) {
    funcion();
    return `HOLA ${funcion(nombre)}`;
}
console.log(saludarEnUpperCase('Edwin',convetirEnMayuscula));
console.log(saludarEnUpperCase('AVILA',convetirEnMinuscula));
console.log(saludarEnUpperCase('Buen Dia',añadirPuntoAlFinal));

//Convertir sgtrind en mayuscukla

function convetirEnMayuscula(texto) {
    return texto.toUpperCase();

}

function convetirEnMinuscula(texto) {
    return texto.toLowerCase();

}

function añadirPuntoAlFinal(texto) {
    return texto + ".";
}

function  primeraLetraMayuscula(texto) {
    var primerLetraMayuscula = texto[0].toUpperCase();
    var restoPalabra = texto.slice(1, texto.length);
    return primerLetraMayuscula + restoPalabra;
}
console.log(saludarEnUpperCase('Edwin',primeraLetraMayuscula));
