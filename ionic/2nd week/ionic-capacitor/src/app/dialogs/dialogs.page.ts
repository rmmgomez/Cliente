import { Component } from '@angular/core';
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
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.page.html',
  styleUrls: ['./dialogs.page.scss'],
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
export class DialogsPage {
  confirm = false;
  name = '';

  async showAlert() {
    await Dialog.alert({
      title: 'Hello',
      message: 'This is an alert',
    });
  }

  async showConfirm() {
    const result = await Dialog.confirm({
      title: 'Confirm',
      message: 'Are you going to develop your next app with Ionic?',
    });

    this.confirm = result.value;
  }

  async showPrompt() {
    const result = await Dialog.prompt({
      title: 'Hello',
      message: "What's your name?",
    });

    if (!result.cancelled) {
      this.name = result.value;
    }
  }
}
