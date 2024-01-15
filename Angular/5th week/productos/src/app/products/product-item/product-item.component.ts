import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../star-rating/star-rating.component';

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product; // required: true -> Obligatorio
  @Input() showImage: boolean = true; // Valor por defecto (opcional)
  #productsService = inject(ProductsService);
  
  changeRating(rating: number) {
    const oldRating = this.product.rating; // Por si acaso
    this.product.rating = rating;
    this.#productsService
      .changeRating(this.product.id!, rating)
      .subscribe({error: (error) => {
        // Mostrar mensaje de error
        this.product.rating = oldRating; // Restauramos puntuación
      }});
  }
}
