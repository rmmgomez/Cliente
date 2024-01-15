import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSearchbar
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';
import { BmMapDirective } from '../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../bingmaps/bm-marker.directive';
import { BmAutosuggestDirective } from '../bingmaps/bm-autosuggest.directive';
import { Coordinates } from '../bingmaps/interfaces/coordinates';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonList,
    IonIcon,
    IonFab,
    IonFabButton,
    BmMapDirective,
    BmMarkerDirective,
    BmAutosuggestDirective,
    IonSearchbar
  ],
})
export class NavigationPage implements OnInit, AfterViewInit {
  coords: Coordinates = {
    latitude: 0,
    longitude: 0,
  };
  validInputId = false;

  @ViewChild(IonSearchbar) searchBar!: IonSearchbar;

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords.latitude = coordinates.coords.latitude;
    this.coords.longitude = coordinates.coords.longitude;
  }

  async ngAfterViewInit() {
    const input = await this.searchBar.getInputElement();
    input.id = "search";
    this.validInputId = true;
  }

  startNavigation() {
    StartNavigation.launchMapsApp({
      latitude: this.coords.latitude,
      longitude: this.coords.longitude,
      name: 'Directions example',
    });
  }

  searchResult(result: Coordinates) {
    this.coords = result;
  }
}
