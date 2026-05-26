# 🌸 Sistema de Gestión de Bici Taxis y Mantenimiento 🌸

Este proyecto consiste en una aplicación web con contenedores  que permite administrar el inventario de unidades de bici taxis, controlando aquellas que se encuentran operativas y las que ingresan a mantenimiento. El sistema cuenta con un módulo de autenticación seguro y un panel de control interactivo

## Arquitectura del Sistema
La aplicación utiliza una arquitectura de microservicios contenerizados mediante Docker y organizada con Docker Compose
1. Backend : Servidor API REST desarrollado en Node.js con el framework Express.
2. Base de Datos: PostgreSQL encargado de almacenar los datos de usuarios y vehículos 

Tecnologías Utilizadas
Backend: Node.js, Express.js, pg (PostgreSQL Client para Node.js).
Frontend: HTML, CSS, JavaScript
Base de Datos: PostgreSQL
Contenedores: Dnocker & Docker Compose. 

Se implementaron funciones debdio a errores, pues el contenedor de Node.js iniciaba en milisegundos, mientras que PostgreSQL requería unos segundos adicionales para configurar sus archivos internos.Para solucionar este problema de sincronización asíncrona, se implementó un mecanismo de reconexión automática en src/index.js mediante un ciclo de espera activo (while(!conectado)). Si la base de datos no está lista, el servidor backend captura el error, espera 3 segundos y reintenta la conexión. Una vez establecida, crea de forma automática las tablas (bicis y usuarios) e inyecta las credenciales iniciales en caso de que la base de datos se encuentre vacía, eliminando la dependencia de scripts externos manuales.

Credenciales de Acceso
El sistema cuenta con dos usuarios preconfigurados automáticamente en la base de datos: 
Usuario--lauu -- churro
Contraseña-- churrito -- lauu
Comandos de Control de Docker Utilizados
Construcción y Encendido: docker-compose up --build
Apagado: docker-compose down -v

## FLUJO DEL SISTEMA 
EL Docker enciende el contenedor de la base de datos (db) y el de la aplicación (app).
El usuario escribe sus credenciales y da clic en "Ingresar".

* Envío de Datos: El JavaScript del frontend atrapa ese evento, empaqueta los datos en un objeto JSON y hace un fetch hacia /api/login.

* Validación en el Backend: Node recibe el JSON, desempaqueta el usuario y la contraseña, y realiza una consulta a la base de datos
Si coinciden: Cambia la variable usuarioAutenticado = true y responde con un estado exitoso

Al cargar la página o escribir en el buscador, JS dispara un fetch de tipo GET a /api/bicis.

Si usuarioAutenticado es true. Al serlo, ejecuta next() y le permite pasar.

Postgres regresa las filas, Node las convierte en JSON y se las envía al frontend. El JavaScript dibuja las filas de la tabla y actualiza el contador de "TOTAL BICIS".

* Registrar una Nueva Unidad 
Escribes el modelo en el formulario y das clic en "Añadir".

El backend recibe el nombre, ejecuta un INSERT INTO bicis y le responde al cliente con un mensaje de éxito.

El frontend recibe la confirmación y vuelve a disparar la función de cargar las bicis para que la nueva unidad aparezca mágicamente en la tabla.

* Modificar o Eliminar 
Al dar clic en "Editar" o "Eliminar", se dispara una ventana de confirmación 

Si aceptas, el frontend envía un PUT o DELETE incluyendo el ID de la unidad directamente en la URL

Node detecta el ID  ejecuta el comando SQL correspondiente y confirma al frontend para que refresque la tabla visual.

* Cierre de Sesión 
El usuario da clic en "Cerrar Sesión".

Se envía un POST Node cambia la variable global usuarioAutenticado = false y el frontend redirige inmediatamente a la pantalla de login, bloqueando todo el sistema de nuevo.

