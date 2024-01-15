import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Output() ratingChanged = new EventEmitter<number>();
  auxRating = 0;
  @Input()
  set rating(rating: number) {
    this.#rating = rating;
    this.auxRating = rating;
  }

  #rating = 0;


  restoreRating() {
    this.auxRating = this.#rating;
  }
  changeRating(rating: number) {
    this.ratingChanged.emit(rating);
  }
}
