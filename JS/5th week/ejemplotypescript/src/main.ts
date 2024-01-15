// TIPADO IMPLICITO

/* console.log("---------- Tipado implicito ----------");
let nombre = "Rosa";
/* nombre = 33; */

// let a; // Tipo any
// a = 34;
// a ="s"; //Tipado dinamico como JS
// console.log("Tipo any: " + a); 

// const arr = []; // Array de any...
// arr[0] = 2;
// arr[1] = "sda";
// console.log("Array de any: " + arr); */


// // Tipado explicito
// console.log("---------- Tipado explicito ----------");
// let num: number;
// num = 23;
// /* num = "Hola"; */

// // Arrays
// const arrNum: number[] = []; // const arrNum2: Array<string> = [];
// arrNum[0] = 2;
// arrNum[1] = 3;
// /* arrNum[2] = "3"; */
// /* arrNum.push("sda");  */
// arrNum.push(3);
// console.log(arrNum);

// const arrNum2: Array<string> = [];
// arrNum2.push("Holi");

// FUNCIONES
/* console.log("---------- Funciones ----------");
function suma(n1: number, n2: number): number{
    return n1 + n2;
}
function saluda(): void {
    console.log("Hola");
    // return;
}

console.log(suma(3,5));
// console.log(suma(3, "2"));

console.log("---------- Funciones arrow y parámetro ----------");
let fun: (n1: number, n2: number) => number; // Definición
fun = (n1, n2) => n1 + n2; // Cuerpo de la función

console.log(fun(3,4));
fun = (n1, n2) => n1 - n2; // "Sobreescribo" la funcion
console.log(fun(3,4));

function operar(n1: number, n2: number, fun: (n1: number, n2: number) => number): number{
    return fun(n1,n2);
}
console.log("F. Operar " + operar(2,3, (n1, n2) => n1*n2)); */

// Unión de tipos
/* console.log("---------- Unión de tipos ----------");
function longitud (cifra: number | string): number{
    return String(cifra).length;
}

console.log(longitud(233));
console.log(longitud("233")); */


// Crear tipos

/* console.log("---------- Crear tipos ----------");
type Rol = "admin" | "user" | "guest";
class Persona {
    nombre: string;
    rol: Rol; // Solo puede ser "admin", "usuario" o "invitado"

    constructor(nombre: string, rol: Rol) {
        this.nombre = nombre;
        this.rol = rol;
    }
}

let p = new Persona("Juan", "admin"); // OK */


// Tupla --> Array de long fija con tipo datos def en cada pos
/* console.log("---------- Tuplas ----------");
type TuplaPersona = [string, number];
const tp: TuplaPersona = ["Pepe", 23];  */// OK */

// Objetos

/* class Person {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
}
const person: Person = new Person("Juan", 54); */


//Estructura JSON para tipar las propiedades de un objeto ya sea genericos o js
/* const personas: { nombre: string, edad: number }[] = [
    {
        nombre: "Ana",
        edad: 34
    },
    {
        nombre: "Juan",
        edad: 35
    }
];
console.log(personas); */


// Más limpio!! Permite implem en calse, crear intf derivadas...
/* interface iPersona {
    nombre: string;
    edad: number;
}

// Array de personas
const personas2: iPersona[] = [
    {
        nombre: "Ana",
        edad: 34
    },
    {
        nombre: "Juan",
        edad: 35
    }
];
console.log(personas2); */


// OO = JS
/* class Persona {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
} */

/* class Persona {
    nombre: string;
    edad: number;
    private rol: string;

    constructor(nombre: string, edad: number, rol: string) {
        this.nombre = nombre;
        this.edad = edad;
        this.rol = rol;
    }
}

const p = new Persona("Juan", 42, "admin");
//console.log(p.rol); // Property 'rol' is private and only accessible within class 'Persona'
Object.entries(p).forEach(([k,v]) => console.log(`${k} => ${v}`)); // No marca error

    // nombre => Juan
    // edad => 42
    // rol => admin -> Estamos accediendo a una propiedad "private". En JavaScript se elimina el modificador
 */

/* class Persona {
    nombre: string;
    edad: number;
    #rol: string;

    constructor(nombre: string, edad: number, rol: string) {
        this.nombre = nombre;
        this.edad = edad;
        this.#rol = rol;
    }
}

const p = new Persona("Juan", 42, "admin");
//console.log(p.#rol); // roperty '#rol' is not accessible outside class 'Persona' because it has a private identifier
Object.entries(p).forEach(([atributo,valor]) => console.log(`${atributo} => ${valor}`)); // No va a listar el atributo #rol

    // nombre => Juan
    // edad => 42
 */

/* class Persona {
    // No necesitas crearte esos atributos fuera, los crea él (ya sean public o private)
    constructor(public nombre: string, public edad: number) { }
}

const p = new Persona("Juan", 34);
console.log(`${p.nombre} - ${p.edad}`); // Juan - 34
 */

/* interface Saluda {
    nombre: string;
    saluda: () => void
}

class Persona implements Saluda {
    //Resto del código

    // Obligatorio implementar este método
    saluda(): void {
        console.log(`Hola, me llamo ${this.nombre}`);
    }
} */


// PAra tipar objetos
/* interface Direccion {
    calle: string;
    numero: number;
    cp: string;
}

interface Persona {
    nombre: string;
    edad: number;
    direccion: Direccion;
    telefonos: string[];
}

const p: Persona = {
    nombre: "Pedro",
    edad: 35,
    direccion: {
        calle: "Perico Palotes",
        numero: 12,
        cp: "24353"
    },
    telefonos: ["9542345453", "6574352643"]
};
console.log(p); */

// Polimorfismo
/* class Persona {
    constructor(public nombre: string, public edad: number) { }
}

class Usuario extends Persona {
    constructor(nombre: string, edad: number, public email: string, public password: string) {
        super(nombre, edad);
    }
}

class Cliente extends Persona {
    constructor(nombre: string, edad: number, public vip: boolean) {
        super(nombre, edad);
    }
}

const p: Persona = new Usuario("Juan", 35, "juan@email.com", "1234");
const p2: Persona = new Cliente("Pepe", 64, true);
const personas: Persona[] = [p, p2];


// Problema --> atributos o metodos no definidos = Sol. casting
console.log(p.email); // Error: Property 'email' does not exist on type 'Persona'

const usuario = p as Usuario; // Casting explícito
console.log(usuario.email); // OK
console.log((p as Usuario).email); // También es válido */


// Operador opcionalidad ?
// console.log("Op. opcionalidad");
// function saluda(nombre?: string) {
//     // El tipo de 'nombre' será: string | undefined
//     if(!nombre) {
//         console.log("No sé quién eres");
//     } else {
//         console.log(`Hola ${nombre}`);
//     }
// }

// saluda(); // OK
// saluda("Pepe"); // OK 

// interface Persona {
//     nombre: string;
//     edad: number;
//     numSocio?: number; // Realmente será number | undefined
// }

// const p: Persona = {
//     nombre: "Ana",
//     edad: 40
// }; // OK
// console.log(p.numSocio); // undefined 

// const a = ["perro", "casa", "árbol", "mesa", "coche"];
// const palabra = a.find((p) => p.startsWith("z")); // Devuelve string | undefined

// console.log(palabra.toLocaleUpperCase()); // ERROR: 'palabra' is possibly 'undefined'
// console.log(palabra?.toLocaleUpperCase()); // Si palabra es undefined, devuelve undefined sin acceder al método */



// OPERADOR NO_NULL    !

/* const a = ["perro", "casa", "árbol", "mesa", "coche"];
const palabra = a.find((p) => p.startsWith("c")); // Devuelve string | undefined

console.log(palabra.toLocaleUpperCase()); // ERROR: 'palabra' is possibly 'undefined'
console.log(palabra!.toLocaleUpperCase()); // Estamos seguros de que no es undefined (Cuidado!)

class Persona {
    nombre!: string; // Property 'nombre' has no initializer and is not definitely assigned in the constructor
    edad!: number; // Property 'edad' has no initializer and is not definitely assigned in the constructor

    private constructor() {} // Constructor privado, no se puede invocar fuera

    static crear(nombre: string, edad: number) { // Método constructor estático
        const p = new Persona();
        p.nombre = nombre;
        p.edad = edad;
        return p;
    }

    toString() {
        return `${this.nombre} - ${this.edad}`;
    }
}

const p = Persona.crear("Juan", 23);
console.log(p); // Juan - 23 */

