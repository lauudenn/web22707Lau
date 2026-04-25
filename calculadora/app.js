function agregarPantalla(value) {
    document.getElementById("pantalla").value += value;
}

function limpiarPantalla() {
    document.getElementById("pantalla").value = "";
}

function calcularResultado() {
    try {
        let resultado = eval(document.getElementById("pantalla").value);
        document.getElementById("pantalla").value = resultado;
    } catch (error) {  
        document.getElementById("pantalla").value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    let tecla = event.key;
    let pantalla = document.getElementById("pantalla");

    if (!isNaN(tecla)) {
        agregarPantalla(tecla);
    }

    else if (tecla === "+" || tecla === "-" || tecla === "*" || tecla === "/") {
        agregarPantalla(tecla);
    }

    else if (tecla === ".") {
        agregarPantalla(".");
    }

    else if (tecla === "Enter") {
        calcularResultado();
    }

    else if (tecla === "Backspace") {
        pantalla.value = pantalla.value.slice(0, -1);
    }


    else if (tecla.toLowerCase() === "c") {
        limpiarPantalla();
    }

});