import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { StarRatingComponent } from '../../star-rating/star-rating.component';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  #router = inject(Router);
  #productsService = inject(ProductsService);
  @Input() product!: Product;
  goBack() {
    this.#router.navigate(['/products']);
  }

  changeRating(rating: number) {
    const oldRating = this.product!.rating; // Por si acaso
    this.product!.rating = rating;
    this.#productsService
      .changeRating(this.product!.id!, rating)
      .subscribe({error: (error) => {
        // Mostrar mensaje de error
        this.product!.rating = oldRating; // Restauramos puntuación
      }});
  }
}