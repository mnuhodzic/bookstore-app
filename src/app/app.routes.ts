import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'category/:name',
    loadComponent: () =>
      import('./category/category.component').then((m) => m.CategoryComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./product/product.component').then((m) => m.ProductComponent),
  },
  { path: '**', component: HomepageComponent },
];
