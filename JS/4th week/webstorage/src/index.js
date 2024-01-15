/* // Creamos la variable usuario con el valor "Pepe"
localStorage.setItem("usuario", "Pepe");
// También se puede crear así:
localStorage.usuario = "Pepe";

//Obtener el valor guardado
console.log("Usando el método --> " + localStorage.getItem("usuario")); // Imprime "Pepe"
// O así
console.log("usando el operador . --> " + localStorage.usuario); // Imprime "Pepe"

// Borrar una variable/entrada
localStorage.removeItem("usuario");

// Borramos todos los datos almacenados
localStorage.clear(); */

getLocation().then((coords) => {
    const p = document.getElementById("coordenadas");
    p.textContent = "Latitud: " + coords.latitude + ". Longitud: " + coords.longitude  +
                                " (Precisión: " + coords.accuracy + ")";
});

function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                resolve(pos.coords);
            },
            error => {
                switch (error.code) {
                case error.PERMISSION_DENIED: // User didn't allow the web page to retrieve location
                    reject("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE: // Couldn't get the location
                    reject("Location information is unavailable.");
                    break;
                case error.TIMEOUT: // The maximum amount of time to get location information has passed
                    reject("The request to get user location timed out.");
                    break;
                default:
                    reject("An unknown error occurred.");
                    break;
                }
            }
        );
    });
}

const API_KEY ="AmCsCCqcPEgBpcQEt-j_fZpvSQ_GhKqyvzOk1UiIb3vd1l1Usz51mj-K1uB9hvxl";

/* Imagen estática */
/* async function showMap() {
    let coords = await getLocation();
    const latlon = coords.latitude + "," + coords.longitude;

    const imgUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latlon}/15?mapSize=600,300&pp=${latlon};66&mapLayer=Basemap,Buildings&key=${API_KEY}`;

    document.getElementById("mapaEstatico").src = imgUrl;
}

showMap(); */


/* MApa dinamico */
function loadBingAPI(apiKey) {
    const script = document.createElement("script");
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=${apiKey}&callback=showMap`;
    script.defer = true;
    document.body.append(script);
}

/* Para crearnos marcadores */
function createMarker(map, {latitude, longitude}, title, color = "blue") {
    const pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(latitude, longitude), { title, color });
    map.entities.push(pin);
}

async function showMap() {
    const Microsoft = window.Microsoft;
    const coords = await getLocation();
    const map = new Microsoft.Maps.Map(document.getElementById("map"), {
        credentials: API_KEY,
        center: new Microsoft.Maps.Location(coords.latitude, coords.longitude),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 16/* zoom */
    });    

    /* Activar sugerencias automáticas */

    Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", () => {
        const manager = new Microsoft.Maps.AutosuggestManager({ map });
        manager.attachAutosuggest("#searchBox", "#searchBoxContainer", result => {
            createMarker(map, result.location, "", "red");
            map.setView({center: result.location});
            // Las coordenadas están en result.location.latitude y result.location.longitude
        });
    });

    /* Con marcadores */
    // Cada click en el mapa crea un marcador y centra el mapa en esa posición
    Microsoft.Maps.Events.addHandler(map, "click", (e) => {
        createMarker(map, e.location, "", "red");
        map.setView({center: e.location});
    });
    const center = map.getCenter();
    createMarker(map, center, "Estás aquí");
}

loadBingAPI(API_KEY);
window.showMap = showMap;