import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
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
  starEmpty = faStarEmpty;
  starFull = faStarFull;

  restoreRating() {
    this.auxRating = this.#rating;
  }
  changeRating(rating: number) {
    this.ratingChanged.emit(rating);
  }
}
