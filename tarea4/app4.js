let opci = prompt(`
        Elija una opcion:
        1.- Lunes
        2.- Martes
        3.- Miercoles
        4.- Jueves 
        5.- Viernes
    `);

    switch(opci){
        case "1":
            console.log("Jugar roblox");
            break;
        case "2":
            console.log("Ver pelis");
            break;
        case "3":
            console.log("Salir a caminar al pasto");
            break;
        case "4":
            console.log("Estudiar un buen rato");
            break;
        case "5":
            console.log("Viernes de Chain");
            break;

        default:
            console.log("No valido");
            break;
    }