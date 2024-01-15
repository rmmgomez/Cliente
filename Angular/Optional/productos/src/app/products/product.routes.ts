import { Routes } from '@angular/router';
import { leavePageGuard } from '../guards/leave-page.guard';
import { productResolver } from './resolvers/product.resolver';
import { numericIdGuard } from '../guards/numeric-id.guard';

export const productsRoutes: Routes = [
  {
    path: '',
    title: 'Productos | Angular products',
    loadComponent: () =>
      import('./products-page/products-page.component').then(
        (m) => m.ProductsPageComponent
      ),
    data: { animation: 'productsPage' },
  },
  {
    path: 'add',
    title: 'New product | Angular products',
    canDeactivate: [leavePageGuard],
    loadComponent: () =>
      import('./product-form/product-form.component').then(
        (m) => m.ProductFormComponent
      ),
  },
  {
    path: ':id',
    canActivate: [numericIdGuard],
    resolve: {
      product: productResolver,
    },
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    data: { animation: 'productDetail' },
  },
];
