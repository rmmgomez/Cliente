// ts interfaces --> HTMLElement, solo tiene att y metodos comunes
// Tipado de genéricos solo funciona con querySelector o querySelectorAll

/* const img = document.getElementById("img"); // HTMLElement | null
img!.src = "dibujo.jgeg"; // Property 'src' does not exist on type 'HTMLElement'.

const img2 = document.querySelector<HTMLImageElement>("#img"); // HTMLImageElement | null
img2!.src = "nueva ruta"; // OK

const img3 = document.getElementById("#img") as HTMLImageElement; // Casting, mejor querySelector
img3.src = "nueva ruta"; // OK */

// Crear elem DOM
/* const imag = document.createElement("img"); // Devuelve un HTMLImageElement
imag.src = "Ruta Imagen"; // OK, no hay problema */

// Conflictos de tipos --> llama un campo name o ticonst form = document.getElementById("form") as HTMLFormElement;
const inputPrecio = form.precio as HTMLInputElement;

// Sol
const form1 = document.getElementById("form") as HTMLFormElement;
const inputName1 = form1.name as unknown as HTMLInputElement; // De string a unkown ("quito" tipo)
// Mejor solucion --> Colección elements
const formu = document.getElementById("form") as HTMLFormElement;
const inputName2 = formu.elements.namedItem("name") as HTMLInputElement; // Sino hacemos esto nos dev un string
tle
/*  */