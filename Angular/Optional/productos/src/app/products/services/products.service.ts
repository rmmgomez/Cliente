import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductsResponse, SingleProductResponse } from '../interfaces/responses.ts';

@Injectable({ // Injectable --> damos servicio a cualquier componente/clase que lo pida
  providedIn: 'root' // Disponibles para todos los componentes de la app (root)
})
export class ProductsService {
  #productsUrl = 'products';
  #http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.#http
      .get<ProductsResponse>(`${this.#productsUrl}`)
      .pipe(map((resp) => resp.products));
  }
  changeRating(idProduct: number, rating: number): Observable<void> {
    return this.#http.put<void>(`${this.#productsUrl}/${idProduct}/rating`, {
      rating: rating,
    });
  }
  getProduct(id: number): Observable<Product> {
    return this.#http
      .get<SingleProductResponse>(`${this.#productsUrl}/${id}`)
      .pipe(map((resp) => resp.product));
  }
  addProduct(product: Product): Observable<Product> {
    return this.#http
      .post<SingleProductResponse>(`${this.#productsUrl}`, product)
      .pipe(map((resp) => resp.product));
  }
}
