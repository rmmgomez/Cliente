import { Component, OnDestroy } from '@angular/core';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-flashlight',
  templateUrl: './flashlight.page.html',
  styleUrls: ['./flashlight.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  ],
})
export class FlashlightPage implements OnDestroy {
  on = false;

  async toggleFlash() {
    this.on = (await CapacitorFlash.toggle()).value;
  }

  ngOnDestroy() {
    CapacitorFlash.switchOff();
  }
}
