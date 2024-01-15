import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonList,
    IonContent,
    IonItem,
  ],
})
export class InfiniteScrollPage implements OnInit {
  items: String[] = [];
  num = 1;
  finished = false;

  ngOnInit() {
    this.loadMoreItems();
  }

  loadMoreItems(infinite?: IonInfiniteScroll) {
    // Simulating an external service call with a timeout
    setTimeout(
      () => {
        const max = this.num + 20;
        for (; this.num < max; this.num++) {
          this.items.push('Item ' + this.num);
        }
        if (this.num >= 120) {
          // We'll load a maximum of 60 items
          this.finished = true;
        }

        infinite?.complete(); // Hide the loader (if not undefined)
      },
      infinite ? 2000 : 0
    );
  }
}
