import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import {
  ToastController,
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

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
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
export class PreferencesPage implements OnInit {
  name = '';

  #toastCtrl = inject(ToastController);

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'name' });
    if (value) {
      this.name = value;
    }
  }

  async save() {
    await Preferences.set({ key: 'name', value: this.name });

    const toast = await this.#toastCtrl.create({
      message: 'Name saved!',
      duration: 1500,
      position: 'middle',
    });
    toast.present();
  }
}
