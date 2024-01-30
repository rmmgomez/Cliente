import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  Platform,
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonAvatar,
  IonImg,
  IonRouterLink,
  NavController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home,
  logIn,
  documentText,
  checkmarkCircle,
  images,
  camera,
  arrowUndoCircle,
  add,
  menu,
  trash,
  eye,
  close,
  exit,
  informationCircle,
  chatboxEllipses,
} from 'ionicons/icons';
import { AuthService } from './auth/services/auth.service';
import { User } from './auth/interfaces/user';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonRouterLink,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonAvatar,
    IonImg,
  ],
})
export class AppComponent {
  user: User | null = null;

  #authService = inject(AuthService);
  #platform = inject(Platform);
  #nav = inject(NavController);
  #toast = inject(ToastController);

  public appPages = [
    { title: 'Home', url: '/products', icon: 'home' },
    { title: 'Add product', url: '/products/add', icon: 'add' },
  ];
  constructor() {
    addIcons({
      home,
      logIn,
      documentText,
      checkmarkCircle,
      images,
      camera,
      arrowUndoCircle,
      add,
      menu,
      trash,
      eye,
      close,
      exit,
      informationCircle,
      chatboxEllipses,
    });

    effect(() => {
      if (this.#authService.logged()) {
        this.#authService.getProfile().subscribe((user) => (this.user = user));
      } else {
        this.user = null;
      }
    });

    this.initializeApp();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
      StatusBar.setBackgroundColor({ color: '#3880ff' });
      StatusBar.setStyle({ style: Style.Dark });
      const res = await PushNotifications.checkPermissions();
      if (res.receive !== 'granted') {
        await PushNotifications.requestPermissions();
      }

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        'pushNotificationReceived',
        async (notification: PushNotificationSchema) => {
          const toast = await this.#toast.create({
            header: notification.title,
            message: notification.body,
            duration: 3000,
          });
          await toast.present();
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          if (notification.notification.data.prodId) {
            this.#nav.navigateRoot([
              '/products',
              notification.notification.data.prodId,
              'comments',
            ]);
          }
        }
      );
    }
  }
  async logout() {
    await this.#authService.logout();
    this.#nav.navigateRoot(['/auth/login']);
  }
}
