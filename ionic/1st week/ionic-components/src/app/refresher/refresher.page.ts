import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.page.html',
  styleUrls: ['./refresher.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonLabel,
    IonContent
  ],
})
export class RefresherPage implements OnInit {
  items = [1, 2, 3, 4, 5];

  ngOnInit() {
    this.update();
  }

  update() {
    this.items = this.items.map((n) => Math.round(Math.random() * 99 + 1));
  }

  refresh(refresher: IonRefresher) {
    setTimeout(() => {
      this.update();
      refresher.complete();
    }, 2000);
  }
}
