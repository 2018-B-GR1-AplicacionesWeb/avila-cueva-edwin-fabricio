declare var require:any;
declare var Promise;
const inquirer = require ('inquirer');
const fs = require('fs');


var nombreArchivo = 'bdd.json'
const opcionesMenu ={
    type: 'list',
    name: 'opcionMenu',
    message: 'Escoge la opción qué desees: ',
    choices: [
        'Crear',
        'Borrar',
        'Actualizar',
        'Buscar',
    ]
};

const preguntasAlUsuario = [
    { type: 'input', name: 'idUsuario', message: 'Ingrese un ID: '},
    { type: 'input', name: 'nombreUsuario', message: 'Ingrese el nombre del usuario: '},

];

const preguntaParaBuscar =[
    { type: 'input', name: 'nombreABuscar', message: 'Que nombre desea Buscar: '}
];
const preguntaParaEliminar =[
    { type: 'input', name: 'nombreABuscar', message: 'Que nombre desea Buscar: '}
];

async function main() {
    try{
        await inicilizarBase();
        const  respuestaOpcionMenu = await inquirer.prompt(opcionesMenu);
        console.log('Respuesta.opcionMenu: ',respuestaOpcionMenu.opcionMenu);
        switch (respuestaOpcionMenu.opcionMenu) {
            case 'Crear':
                console.log('Pedir Datos');
                const respuestaPreguntasAlUsuario = await inquirer.prompt(preguntasAlUsuario);
                console.log('respuestas al DeTipoUsuario',respuestaPreguntasAlUsuario);
                const respuestaAñadirUsuario = await añadirDatosALaBase(respuestaPreguntasAlUsuario);
                main();
                break;
            case 'Buscar':
                const respuestaPreguntaParaBuscar = await inquirer.prompt(preguntaParaBuscar);
                console.log(respuestaPreguntaParaBuscar.nombreABuscar)
                const respuestaBuscarUnUsuario = await  buscarUsuario(respuestaPreguntaParaBuscar.nombreABuscar);
                console.log('USUARIO QUE QUERIA BUSCAR -->  ',respuestaBuscarUnUsuario);
                break;
            case 'Borrar':
                const respuestaPreguntaParaEliminar = await inquirer.prompt(preguntaParaEliminar);
                console.log(respuestaPreguntaParaEliminar.nombreABuscar)
                const respuestaEliminarUsuario = await  borrarUsuario(respuestaPreguntaParaEliminar.nombreABuscar);
                console.log(respuestaEliminarUsuario);
                break;
            case 'Actualizar':
                break;
        }

    } catch (e) {
        console.log('HUBO UN ERROR')
    }
}

function inicilizarBase(){
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(nombreArchivo,'utf-8',
                (error,contenidoLeido)=>{
                    if(error){
                        fs.writeFile(nombreArchivo,'{"usuarios":[],"juegos":[]}',
                            (error)=>{
                                if(error){
                                    reject(
                                        {mensaje:'HUBO UN ERROR AL CREAR EL ARCHIVO'}
                                    )
                                }else{
                                    resolve(
                                        {mensaje:'OK'}
                                    );
                                }
                            }
                        );
                    }else {
                        resolve(
                            {mensaje:'OK'}
                        );
                    }
                }
            );
        }
    );
};

function añadirDatosALaBase(usuarioIngresarEnLaBase){
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(nombreArchivo,'utf-8',
                (error,contenidoLeido)=>{
                    if(error){
                        reject(
                            {mensaje:'ERROR AL LEER EL ARCHIVO'}
                        );
                    }else {
                        //jason parse-->para transformar de STRING a objeto JSON
                        const bddJSONPARSE = JSON.parse(contenidoLeido);
                        bddJSONPARSE.usuarios.push(usuarioIngresarEnLaBase);
                        fs.writeFile(nombreArchivo,JSON.stringify(bddJSONPARSE),
                            (error)=>{
                                if(error){
                                    reject(
                                        {mensaje:'ERROR AL ESCRIBIR EL ARCHIVO'}
                                    );
                                }else{
                                    resolve(
                                        {mensaje:'USUARIO AÑADIDO EN LA BASE'}
                                    );
                                }
                            }

                        );
                    }
                }
            );
        }
    );
};

function buscarUsuario(nombreUsuarioABuscar){
    console.log(nombreUsuarioABuscar);
    return new Promise(
        (resolve,reject)=> {
            fs.readFile(nombreArchivo, 'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(
                            {mensaje: 'ERROR AL LEER EL ARCHIVO'}
                        );
                    } else {
                        const bddJSONPARSE = JSON.parse(contenidoLeido);
                        console.log(bddJSONPARSE);
                        const resultadoFindIndex = bddJSONPARSE.usuarios.find(
                            (bddJSONPARSE)=>{
                                return bddJSONPARSE.nombreUsuario === nombreUsuarioABuscar;
                            }
                        );
                        resolve(
                            resultadoFindIndex
                        )
                    }
                }
            );
        }
    );

};

function borrarUsuario(nombreUsuarioAEliminar){
    return new Promise(
        (resolve,reject)=> {
            fs.readFile(nombreArchivo, 'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(
                            {mensaje: 'ERROR AL LEER EL ARCHIVO'}
                        );
                    } else {
                        const bddJSONPARSE = JSON.parse(contenidoLeido);
                        console.log(bddJSONPARSE);
                        const resultadIndexOf = bddJSONPARSE.usuarios.indexOf(nombreUsuarioAEliminar)
                        const resultadoSplice = bddJSONPARSE.usuarios.splice(resultadIndexOf,1);
                        fs.writeFile(nombreArchivo,JSON.stringify(bddJSONPARSE),
                            (error)=>{
                                if(error){
                                    reject(
                                        {mensaje:'ERROR AL ESCRIBIR EL ARCHIVO'}
                                    );
                                }else{
                                    resolve(
                                        {mensaje:'SE REESRIBIO EXITOSAMENTE'}
                                    );
                                }
                            }

                        );
                        resolve(
                            {mensaje:'SE ELIMINO Y REESCRIBIO EXITOSAMENTE'}
                        )
                    }
                }
            );
        }
    );

}




const preguntaUsuarioBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre del usuario a buscar'
    }
];


const preguntaUsuarioNuevoNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe tu nuevo nombre'
    }
];







function editarUsuario(nombre, nuevoNombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);


                        const indiceUsuario = bdd.usuarios
                            .findIndex(
                                (usuario) => {
                                    return usuario.nombre = nombre;
                                }
                            );

                        bdd.usuarios[indiceUsuario].nombre = nuevoNombre;


                        fs.writeFile(
                            'bdd.json',
                            JSON.stringify(bdd),
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({mensaje: 'DeTipoUsuario Editado'});
                                }
                            }
                        );
                    }
                });
        }
    );
}

function buscarUsuarioPorNombre(nombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);

                        const respuestaFind = bdd.usuarios
                            .find(
                                (usuario) => {
                                    return usuario.nombre === nombre;
                                }
                            );

                        resolve(respuestaFind);
                    }
                });
        }
    );
}





function actualizarUsuario(){

}


main();