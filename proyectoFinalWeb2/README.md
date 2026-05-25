Gestor de bici taxis

Sistema de gestión, monitoreo y control de acceso para el inventario de Bici Taxis. Este proyecto integra contenedores, persistencia de datos, una API REST segura y una interfaz de usuario

## Descripción del Proyecto
Este proyecto permite la administración de bici taxis, sus registros y conteos, facilitando el control de inventario mediante operaciones CRUD (Crear, Leer, Actualizar, Borrar) y un buscador en tiempo real. Adicionalmente, cuenta con un módulo de autenticación para restringir las funciones operativas únicamente a usuarios administradores registrados en la base de datos.

## Tecnologías Implementadas
- Backend: Node.js, Express.js.
- Frontend: HTML, CSS, javaScript.
- Base de Datos: PostgreSQL.
- Infraestructura: Docker & Docker Compose.

## Arquitectura y Seguridad del Sistema
El sistema se divide en servicios mediante Docker:
1.  Node.js: Se encarga de la lógica de servidor, la API REST 
2.  Database (PostgreSQL): Almacenamiento persistente de datos que gestiona tanto las tablas del inventario de bici taxis como el catálogo de usuarios autorizados.
3.  Volúmenes: Configuración de persistencia local para resguardar los registros en disco aun cuando los contenedores se detengan o reinicien.

## Instrucciones de Ejecución

1.  Tener instalado node y docker
2.  Para inicializar el proyecto se ejecuta el siguiente comando en git bash dentro de mi estructura del proyecto, carpetas
    
    docker-compose down
    docker-compose up --build

3.  Para acceder a mi pagina web se debe ingresar al localhost `http://localhost:3000`. El sistema te redirigirá automáticamente a la pantalla de inicio de sesión (`/login.html`).
    - Usuario por defecto: `lauu`
    - Contraseña: `churrito`
s