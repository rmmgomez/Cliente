import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFilterPipe, ProductItemComponent, ProductFormComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  title = 'Mi lista de productos';
  headers = {
    image: 'Imagen',
    description: 'Producto',
    price: 'Precio',
    available: 'Disponible',
    rating: 'Puntuación',
  };
  products: Product[] = [];
  showImage = true;
  newProduct!: Product;
  search = '';
  #titleService = inject(Title);

  #productsService = inject(ProductsService);
  products$!: Observable<Product[]>;
  
  ngOnInit(): void {
    this.#titleService.setTitle("Productos | Angular Products");
    this.#productsService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (error) => console.log(error),
    });
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  addProduct(product: Product) {
    this.products = [...this.products, product];
  }
}
