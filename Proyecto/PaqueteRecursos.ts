export const opcionesMenu = [
    'Crear','Borrar','Actualizar','Buscar','Añadir',
];

export const tiposDeJuegos = [
    'Lucha','Arcade','Simulación', 'Plataformas','Shooter', 'En primera persona (FPS)',
    'Rol','Estrategia','Deportes','Carreras','Musical',
];


export const tipoDeClasificacion =[
    'Categoria 3+', 'Categoria 7+', 'Categoria 12+',
    'Categoria 16+', 'Categoria 18+', 'Sin Categoria',
];

export const opciones = [
    { type: 'list', name: 'opciones', message: 'Escoga la opción que desee:', choices: opcionesMenu },
];

export const preguntasFormulario = [
    { type: 'input', name: 'nombreDelJuego', message: 'Ingrese nombre del Juego:' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:'},
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: tipoDeClasificacion},
];

export  const preguntaParaActualizar = [
    { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere actulizar?' },
    { type: 'input', name: 'precioDelJuego', message: 'Ingrese el precio del Juego:' },
    { type: 'list', name: 'tipoDelJuego', message: 'Escoga el tipo de Juego:', choices: tiposDeJuegos },
    { type: 'input', name: 'nombreDeLaEmpresaDelJuego', message: 'Ingrese nombre de la Empresa:'},
    { type: 'list', name: 'clasificacion', message: 'Escoga la clasficación del Juego:', choices: tipoDeClasificacion},];

export  const preguntaParaBorrar = [
    { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere borrar?' }];

export const preguntaParaBuscar = [
    { type: 'input', name: 'nombreDelJuego', message: '¿Qué Juego quiere buscar?' }];