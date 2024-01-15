import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
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
  IonAvatar,
  IonImg,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.page.html',
  styleUrls: ['./google-login.page.scss'],
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
    IonAvatar,
    IonImg,
    IonRow,
    IonCol,
  ],
})
export class GoogleLoginPage {
  user!: User;

  async login() {
    try {
      this.user = await GoogleAuth.signIn();
    } catch (err) {
      console.error(err);
    }
  }
}
