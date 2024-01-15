import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BmMapDirective } from '../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../bingmaps/bm-marker.directive';
import { Coordinates } from '../bingmaps/interfaces/coordinates';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    BmMapDirective,
    BmMarkerDirective,
  ],
})
export class GeolocationPage implements OnInit {
  coords?: Coordinates;

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });

    this.coords = coordinates.coords;
  }
}
