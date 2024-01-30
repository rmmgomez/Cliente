import { Component, Input, NgZone, inject } from '@angular/core';
import {
  Platform,
  AlertController,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
} from '@ionic/angular/standalone';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'product-comments',
  templateUrl: './product-comments.page.html',
  styleUrls: ['./product-comments.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
  ],
})
export class ProductCommentsPage {
  @Input() id!: number;
  comments!: Comment[];
  resumeSub!: Subscription;

  #alertCtrl = inject(AlertController);
  #productsService = inject(ProductsService);
  #platform = inject(Platform);
  #ngZone = inject(NgZone);

  ionViewWillEnter() {
    this.loadComments();
    // If the app comes back from being paused, reload comments
    this.resumeSub = this.#platform.resume.subscribe(
      () => this.#ngZone.run(() => this.loadComments()) // Needs NgZone because Angular doesn't detect this event
    );
  }

  ionViewWillLeave(): void {
    this.resumeSub.unsubscribe();
  }

  loadComments(refresher?: IonRefresher) {
    this.#productsService.getComments(this.id).subscribe((comments) => {
      this.comments = comments;
      refresher?.complete();
    });
  }

  async addComment() {
    const alert = await this.#alertCtrl.create({
      header: 'New commment',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Enter your comment',
        },
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok',
        },
        {
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.#productsService
        .addComment(this.id, result.data.values.comment)
        .subscribe((comment) => this.comments.push(comment));
    }
  }
}
