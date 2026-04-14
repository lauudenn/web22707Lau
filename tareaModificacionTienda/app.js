let productos =[ 
    {nombre: 'camisa',   precio: 300, stock: 5},
    {nombre: 'pantalon', precio: 550, stock: 5},
    {nombre: 'zapatos',  precio: 750, stock: 5},
    {nombre: 'sombrero', precio: 550, stock: 5},
    {nombre: 'tenis',    precio: 1200, stock: 5}
];

let carrito=[];

// Contador de productos
let contador = {
    camisa: 0,
    pantalon: 0,
    zapatos: 0,
    sombrero: 0,
    tenis: 0
};

// Función para mostrar el menú
function mostrarMenu(){
   let menu = "Seleccione una opción:\n";
   for( let i = 0 ;i< productos.length ; i++ ){
        menu += (i+1)+" .- " + productos[i].nombre + 
                " - $" + productos[i].precio + "\n";
   } 
   menu += (productos.length+1)+".- Ver carrito y Total\n";
   menu += (productos.length+2)+".- Agregar nuevo producto\n";
   menu += (productos.length+3)+".- Ver contador e inventario\n";
   menu += (productos.length+4)+".- Salir\n";

   return menu;
}

// Función para agregar al carrito
function agregarAlCarrito(index){  
    let productoSeleccionado = productos[index];

    if(productoSeleccionado.stock > 0){
        carrito.push(productoSeleccionado);
        contador[productoSeleccionado.nombre]++;
        productoSeleccionado.stock--;

        console.log(`Producto ${productoSeleccionado.nombre} agregado`);
    } else {
        console.log(`Ya no hay ${productoSeleccionado.nombre}`);
    }
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

        mensajeCarrito+="\nTotal: $"+total;

        // Mostrar contador
        mensajeCarrito+="\n\nCantidad por producto:\n";
        for(let producto in contador){
            mensajeCarrito+= producto + ": " + contador[producto] + "\n";
        }

        console.log(mensajeCarrito);
    }
}

// Función para mostrar contador e inventario
function mostrarContadorInventario(){
    console.log("Contador de productos:");

    for(let i = 0; i < productos.length; i++){
        let nombre = productos[i].nombre;
        let cantidad = contador[nombre];
        let stock = productos[i].stock;

        if(stock === 0){
            console.log(nombre + ": " + cantidad + " (AGOTADO)");
        } else {
            console.log(nombre + ": " + cantidad + " (Stock: " + stock + ")");
        }
    }

    let totalStock = 0;

    for(let i = 0; i < productos.length; i++){
        totalStock += productos[i].stock;
    }

    if(totalStock > 0){
        console.log("Aún hay productos disponibles en inventario");
    } else {
        console.log("Ya no hay productos en inventario");
    }
}

// Función para agregar un nuevo producto
function agregarProducto(){
    let nombre = prompt("Ingrese el nombre del nuevo producto:");
    let precio = Number(prompt("Ingrese el precio del producto:"));
    let stock = Number(prompt("Ingrese la cantidad en stock:"));

    if(nombre && !isNaN(precio) && precio > 0 && !isNaN(stock) && stock > 0){
        productos.push({nombre: nombre, precio: precio, stock: stock});
        contador[nombre] = 0;
        console.log(`Producto ${nombre} agregado con precio $${precio}`);
    }else{
        console.log("Datos inválidos, no se agregó el producto.");
    }
}

/--Menú de inicio--/ 
let opcion;
do{
    opcion = prompt(mostrarMenu());
    opcion = Number(opcion);

    if(isNaN(opcion) || opcion<1 || opcion>productos.length+4){
        console.log("Opción no válida, por favor intenta nuevamente");
    }else if(opcion >= 1 && opcion <= productos.length){
        agregarAlCarrito(opcion-1);
    }else if(opcion === productos.length+1){
        mostrarCarritoTotal();
    }else if(opcion === productos.length+2){
        agregarProducto();
    }else if(opcion === productos.length+3){
        mostrarContadorInventario();
    }

}while(opcion !== productos.length+4);

console.log("Gracias por su compra :)");