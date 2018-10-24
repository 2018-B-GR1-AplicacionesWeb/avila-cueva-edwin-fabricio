const  calculadora = require('./02-calculadora');
const   util = require('../05-nodejs-02/01-util');
const tiempo = require('./tiempo/01-tiempo');
const pepito = require('express');

console.log(calculadora.nombre);
console.log('SUMA', calculadora.sumarDosNumeros(4,5));
console.log('TIEMPO',tiempo);
console.log('Express',pepito);
console.log(util)

