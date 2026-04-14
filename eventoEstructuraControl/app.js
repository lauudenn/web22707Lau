const boton = document.querySelector("#add");
const inputNumero = document.querySelector("#new");
const listaDinamica = document.querySelector("#lista");

boton.addEventListener("click", () => {
    const cantidad = parseInt(inputNumero.value);

    listaDinamica.innerHTML = "";

    if (!isNaN(cantidad)) {
        for (let i = 1; i <= cantidad; i++) {
            const li = document.createElement("li");
            li.textContent = "Elemento dinámico " + i;
            listaDinamica.appendChild(li);
        }
    } else {
        alert("Por favor ingresa un número");
    }
});