"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opcionesMenu = [
    'Crear', 'Borrar', 'Actualizar', 'Buscar',
];
exports.tiposDeJuegos = [
    'Lucha', 'Arcade', 'Simulación', 'Plataformas', 'Shooter', 'En primera persona (FPS)',
    'Rol', 'Estrategia', 'Deportes', 'Carreras', 'Musical',
];
exports.tipoDeClasificacion = [
    'Categoria 3+', 'Categoria 7+', 'Categoria 12+',
    'Categoria 16+', 'Categoria 18+', 'Sin Categoria',
];
exports.opciones = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: exports.opcionesMenu },
];
exports.preguntasFormulario = [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: exports.tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:' },
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: exports.tipoDeClasificacion },
];
exports.preguntaParaActualizar = [
    { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere actulizar?' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: exports.tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:' },
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: exports.tipoDeClasificacion },
];
exports.preguntaParaBorrar = [
    { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere borrar?' }
];
exports.preguntaParaBuscar = [
    { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere buscar?' }
];
