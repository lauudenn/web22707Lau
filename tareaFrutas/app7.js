/*PROGRAMA QUE MUESTRA LISTA Y PERMITE ELEGIR FRTUTAS DE MI LISTA Y LOS VA GUARDANDO EN UN ARREGLO

 PARA DESPUES VOLVER A PREGUNTAR Y MOSTRAR LA LISTA FINAL DE MIS FRUTAS GUARDADAS*/ 

let frutas = ["Manzana", "Plátano", "Naranja", "Uva", "Mango"];
let elegidas = [];
let continuar = true;

while (continuar) {


    //lista de frutas

    let lista = "Frutas disponibles:\n";

    for (let i = 0; i < frutas.length; i++) {

        lista += (i + 1) + ". " + frutas[i] + "\n";

    }
    //pregunta
    let opcion = prompt(lista + "\nElige una fruta por número:");

    //Convertir a número
    let index = parseInt(opcion) - 1;

    // Validar opción
    if (index >= 0 && index < frutas.length) {

        elegidas.push(frutas[index]);

        alert("Agregaste: " + frutas[index]);

    } else {

        alert("Opción inválida");

    }

    //quierpo otra fruta?

    let respuesta = prompt("¿Quieres elegir otra fruta? (si/no)").toLowerCase();

    if (respuesta !== "si") {

        continuar = false;

    }

}

//lista elegoda de las frutas

alert("Frutas elegidas: " + elegidas.join(", "));