import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  Platform,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
  ],
})
export class LoginPage {
  email = '';
  password = '';
  firebaseToken?: string;
  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);
  #platform = inject(Platform);
  constructor() {
    if (this.#platform.is('capacitor')) {
      PushNotifications.register();

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration', (token: Token) => {
        this.firebaseToken = token.value;
      });
    }
  }
  login() {
    this.#authService
      .login(this.email, this.password, this.firebaseToken)
      .subscribe({
        next: () => this.#navCtrl.navigateRoot(['/products']),
        error: async (error) => {
          (
            await this.#alertCtrl.create({
              header: 'Login error',
              message: 'Incorrect email and/or password',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }
}
