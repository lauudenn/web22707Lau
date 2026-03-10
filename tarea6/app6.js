//Programa que adivina un numero del 1-10 con 3 oportunidades para adivinar
let numeroMaquina = Math.floor(Math.random() * (10 - 1) + 1);
console.log(numeroMaquina);

let NumeroUser = parseInt(prompt("Ingresa un numero entre el 1 y el 10"));

let vidas = 3;

while(numeroMaquina !== NumeroUser && vidas > 1){
    vidas--;
    NumeroUser = parseInt(prompt("Intenta nuevamente"));
}

if(numeroMaquina == NumeroUser){
    console.log("Ganaste");
}else{
    console.log("Perdiste - El numero era "+numeroMaquina);
}