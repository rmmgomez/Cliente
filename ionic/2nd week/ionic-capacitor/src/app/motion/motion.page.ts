import { DecimalPipe } from '@angular/common';
import { Component, NgZone, OnDestroy, inject } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.page.html',
  styleUrls: ['./motion.page.scss'],
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
    DecimalPipe,
  ],
})
export class MotionPage implements OnDestroy {
  accelListener!: PluginListenerHandle;
  orientListener!: PluginListenerHandle;
  acceleration = { x: 0, y: 0, z: 0 };
  orientation = { alpha: 0, beta: 0, gamma: 0 };
  started = false;

  #ngZone = inject(NgZone);

  async startMotion() {
    this.accelListener = Motion.addListener('accel', (event) =>
      this.#ngZone.run(() => (this.acceleration = event.acceleration))
    );
    this.orientListener = Motion.addListener('orientation', (event) =>
      this.#ngZone.run(() => (this.orientation = event))
    );

    this.started = true;
  }

  ngOnDestroy() {
    Motion.removeAllListeners();
  }
}
