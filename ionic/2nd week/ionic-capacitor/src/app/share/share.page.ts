import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Share } from '@capacitor/share';
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

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
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
export class SharePage {
  message = '';

  share() {
    Share.share({
      dialogTitle: 'Share with others!',
      text: this.message,

    });
  }
}
