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
  @Input() rating: number = 0;
  @Output() ratingChanged = new EventEmitter<number>();

  auxRating = 0;
  ngOnInit(): void {
    this.restoreRating();
  }
  restoreRating() {
    this.auxRating = this.rating;
  }
  changeRating(rating: number) {
    this.ratingChanged.emit(rating);
  }
}
