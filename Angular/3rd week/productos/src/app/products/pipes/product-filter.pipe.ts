import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'productFilter',
  standalone: true,
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[] | null, search?: string): Product[] | null{
    if (!products) return null;
    const searchLower = search?.toLocaleLowerCase();
    return searchLower
      ? products.filter((prod) =>
          prod.description.toLocaleLowerCase().includes(searchLower)
        )
      : products;
  }
}
