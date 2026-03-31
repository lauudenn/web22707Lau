let alumno = {
    id: 424131111,
    nombre: "Lau",
    primerApellido: "Mendoza",
    segundoApellido: "Velasco",
    edad: 21,
    titulado: false,
    egresado: {
        estado: true
    },
    domicilio: { 
        calle: {
            nombre: "Florecita",
            numero: "24B",
            interior: "2",
            manzana: 7,
            lote: 15
        }, 
        colonia: "San Pedro",
        CP: "01000",
        alcaldia: "Gustavo A. Madero",
        estado: "CDMX",
        pais: "México",
        continente: "América" 
    },
    kinder: {
        nombre: "Aguilera Dorantes",
        actividadPrimerdia() {
            console.log("jugar con bloques");
        },
        actividadRecurrente() {
            console.log("cantar canciones");
        },
        datosMiss: {
            nombre: "Paloma",
            edad: 29,
            estudios: "Maestría"
        }
    },
    primaria: {
        nombre: "Emiliano Zapata",
        comer(comida) {
            return `Ahora está comiendo ${comida}`;
        },
        mensaje(mensajeAlumno) {

            return `${this.nombre} es la Primaria y el alumno tiene que ir a ${mensajeAlumno}`;
        }
    }
};
console.log(alumno.kinder.datosMiss.nombre); 
console.log(alumno.primaria.mensaje("Dirección"));
console.log(alumno.primaria.comer("Pastel"));