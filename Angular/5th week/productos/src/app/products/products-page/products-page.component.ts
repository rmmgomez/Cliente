import { Component, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductItemComponent, ProductFormComponent],
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
  products:  WritableSignal<Product[]> = signal([]);
  showImage = signal(true); // WritableSignal<boolean>
  filteredProducts = computed(() =>
    this.products().filter((p) =>
      p.description.toLowerCase().includes(this.search().toLowerCase())
    )
  );
  newProduct!: Product;
  search = signal('');
  #titleService = inject(Title);

  #productsService = inject(ProductsService);
  products$!: Observable<Product[]>;

  constructor() {
    effect(() =>
      console.log(`Products filtered: ${this.filteredProducts().length}`)/* , {allowSignalWrites: true} */
    );
  }
  
  ngOnInit(): void {
    this.#titleService.setTitle("Productos | Angular Products");
    this.#productsService.getProducts().subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.log(error),
    });
  }

  toggleImage() {
    this.showImage.set(!this.showImage());
  }

  addProduct(product: Product) {
    this.products.update((products) => products.concat([product]));
  }
}
