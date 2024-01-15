import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'welcome',
    title: 'Welcome | Angular products',
    loadComponent: () =>
      import('./welcome/welcome.component').then((m) => m.WelcomeComponent),
  },
  {
    path: 'products',
    loadChildren: () => import('./products/product.routes').then(m => m.productsRoutes)
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  // Aquí podríamos cargar un página de error 404 por ejemplo
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }, // default
];
