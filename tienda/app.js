// arreglo donde se guardan los productos que el cliente va agregando al carrito de compras
const carrito = [];

// definimos la clase producto donde se definen los productos que se van a vender en la tienda
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// funcion para agregar productos al carrito de compras
function agregarProducto(carrito, producto, cantidad) {

    const indice = carrito.findIndex(
        (item) =>
            item.producto.nombre === producto.nombre &&
            item.producto.precio === producto.precio
    );

    if (indice !== -1) {
        // si ya existe con mismo nombre y precio suma cantidad
        carrito[indice].cantidad += cantidad;
    } else {
        // si no existe lo agrega como nuevo
        carrito.push({ producto, cantidad: cantidad });
    }

    // actualizar la vista del carrito
    mostrarCarrito(carrito);
}

// funcion para mostrar el carrito de compras
function mostrarCarrito(carrito) {
    const listaCarrito = document.getElementById("carrito");
    listaCarrito.innerHTML = ""; 
    
    carrito.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.producto.nombre} - $${item.producto.precio} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
    });
}

// evento del formulario
document.getElementById("formulario").addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreProducto = document.getElementById("nombre").value.trim();
    const precioProducto = parseFloat(document.getElementById("precio").value);
    const cantidadProducto = parseInt(document.getElementById("cantidad").value);

    // validación
    if (!nombreProducto || isNaN(precioProducto) || isNaN(cantidadProducto)) {
        alert("Completa todos los campos correctamente");
        return;
    }

    const producto = new Producto(nombreProducto, precioProducto);

    agregarProducto(carrito, producto, cantidadProducto);

    document.getElementById("formulario").reset();
});