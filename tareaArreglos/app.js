let productos =[
    {nombre: 'camisa',   precio: 300},
    {nombre: 'pantalon', precio: 550},
    {nombre: 'zapatos',  precio: 750},
    {nombre: 'sombrero', precio: 550},
    {nombre: 'tenis',    precio: 1200}
];

let carrito=[];

// Función para mostrar el menú
function mostrarMenu(){
   let menu = "Seleccione una opción:\n";
   for( let i = 0 ;i< productos.length ; i++ ){
        menu += (i+1)+" .- " + productos[i].nombre + " - $" + productos[i].precio + "\n";
   } 
   menu += (productos.length+1)+".- Ver carrito y Total\n";
   menu += (productos.length+2)+".- Agregar nuevo producto\n";
   menu += (productos.length+3)+".- Salir\n";

   return menu;
}

// Función para agregar al carrito
function agregarAlCarrito(index){  
    let productoSeleccionado = productos[index];
    carrito.push(productoSeleccionado);
    console.log(`Producto ${productoSeleccionado.nombre} se agregó al carrito`);
}

// Función para mostrar carrito y total
function mostrarCarritoTotal(){
    if(carrito.length===0){
        console.log("El carrito está vacío");
    }else{
        let mensajeCarrito ="Carrito de compras\n";
        let total = 0;
        for ( let i = 0; i<carrito.length;i++){
            mensajeCarrito+= (i+1)+" .- "+carrito[i].nombre+" - $"+carrito[i].precio+"\n";
            total+= carrito[i].precio;
        }
        mensajeCarrito+="\n Total: $"+total;
        console.log(mensajeCarrito);
    }
}

// Función para agregar un nuevo producto al arreglo
function agregarProducto(){
    let nombre = prompt("Ingrese el nombre del nuevo producto:");
    let precio = Number(prompt("Ingrese el precio del producto:"));
    if(nombre && !isNaN(precio) && precio > 0){
        productos.push({nombre: nombre, precio: precio});
        console.log(`Producto ${nombre} agregado con precio $${precio}`);
    }else{
        console.log("Datos inválidos, no se agregó el producto.");
    }
}

/*--Menú de inicio--*/ 
let opcion;
do{
    opcion = prompt(mostrarMenu());
    opcion = Number(opcion);

    if(isNaN(opcion) || opcion<1 || opcion>productos.length+3){
        console.log("Opción no válida, por favor intenta nuevamente");
    }else if(opcion >= 1 && opcion <= productos.length){
        agregarAlCarrito(opcion-1);
    }else if(opcion === productos.length+1){
        mostrarCarritoTotal();
    }else if(opcion === productos.length+2){
        agregarProducto();
    }
}while(opcion !== productos.length+3);

console.log("Gracias por su compra :)");
