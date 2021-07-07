
const opcionesMenu = [
    'Crear','Borrar','Actualizar','Buscar','Añadir',
];

const tiposDeJuegos = [
    'Lucha','Arcade','Simulación', 'Plataformas','Shooter', 'En primera persona (FPS)',
    'Rol','Estrategia','Deportes','Carreras','Musical',
];


const tipoDeClasificacion =[
    'Categoria 3+', 'Categoria 7+', 'Categoria 12+',
    'Categoria 16+', 'Categoria 18+', 'Sin Categoria',
];


///////////////////////EXPORTAR/////////////////////////////////////////////7
module.exports.opciones = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: opcionesMenu },
];

module.exports.preguntasDelJuegoACrear = [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del DeTipoJuego:' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del DeTipoJuego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de DeTipoJuego:', choices: tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:'},
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del DeTipoJuego:', choices: tipoDeClasificacion},
];
