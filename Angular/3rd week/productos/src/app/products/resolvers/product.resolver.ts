import { ResolveFn, Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { inject } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';

export const productResolver: ResolveFn<Product> = (route, state) => {
  return inject(ProductsService).getProduct(+route.params['id']).pipe(
    catchError((error) => {
      inject(Router).navigate(['/products']);
      return EMPTY;
    })
  );
};