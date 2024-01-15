import { MapService } from "./map-service";
import { MyGeolocation } from "./myGeolocation";

async function showMap(): Promise<void> {
    const coords = await MyGeolocation.getGeolocation();
    const mapsService = await MapService.createMapService(coords, "map");
    const marker = mapsService.createMarker(coords, "red");
    const autosuggest = await mapsService.getAutoSuggestManager();
    autosuggest.attachAutosuggest("#search", "#searchContainer", (result) => {
        marker.setLocation(result.location);
        mapsService.map.setView({center: result.location});
    });
}

showMap();