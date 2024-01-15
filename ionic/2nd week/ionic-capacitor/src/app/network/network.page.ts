import { Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Network, ConnectionStatus } from '@capacitor/network';
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
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
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
  ],
})
export class NetworkPage implements OnInit, OnDestroy {
  type = 'none';
  connected = false;
  connHandler!: PluginListenerHandle;

  #ngZone = inject(NgZone);

  async ngOnInit() {
    this.setConnection(await Network.getStatus());

    this.connHandler = Network.addListener('networkStatusChange', (status) =>
      this.#ngZone.run(() => this.setConnection(status))
    );
  }

  ngOnDestroy() {
    Network.removeAllListeners();
  }

  setConnection(status: ConnectionStatus) {
    this.connected = status.connected;
    this.type = status.connectionType;
  }
}
