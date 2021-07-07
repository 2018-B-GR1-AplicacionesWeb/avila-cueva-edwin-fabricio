var hola =[
    {
        nombre:'EDWIN',
        apellido:'avila'
    },
    {
        nombre:'EDWIN2',
        apellido:'avila2'
    }
]


 const respuesta = hola
     .find((valor)=>{
    return valor.nombre ==='EDWIN'
})
console.log(respuesta)