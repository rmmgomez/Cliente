import { Component, OnDestroy, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { App, AppInfo } from '@capacitor/app';
import { Dialog } from '@capacitor/dialog';
import { PluginListenerHandle } from '@capacitor/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
  standalone: true,
  imports: [
    JsonPipe,
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
  ],
})
export class AppPage implements OnInit, OnDestroy {
  backHandler!: PluginListenerHandle;
  appInfo!: AppInfo;

  async ngOnInit() {
    this.appInfo = await App.getInfo();

    this.backHandler = App.addListener('backButton', async (event) => {
      const resp = await Dialog.confirm({
        title: 'Close app',
        message: 'Do you really want to exit?',
        okButtonTitle: 'Yes, please',
        cancelButtonTitle: 'Never',
      });

      if (resp.value) {
        App.exitApp();
      }
    });
  }

  ngOnDestroy() {
    this.backHandler.remove();
  }
}
