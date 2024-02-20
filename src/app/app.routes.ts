import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'category/:slug',
    loadComponent: () =>
      import('./category/category.component').then((m) => m.CategoryComponent),
  },
  {
    path: 'product/:slug',
    loadComponent: () =>
      import('./product/product.component').then((m) => m.ProductComponent),
  },
  { path: '**', component: HomepageComponent },
];
