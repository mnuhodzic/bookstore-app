import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { GraphQLService } from '../services/graph-ql.service';
import { flattenEntityResponseCollection as flatten } from 'strapi-flatten-graphql';
import { map, take } from 'rxjs';
import { Category } from '../models/category';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  // this service is used to populate navigation bar dynamically from the data from server without hardcoding
  categories: { name?: string; slug: string }[] = [];

  constructor(private navbar: NavbarService, private graphQL: GraphQLService) {
    effect(() => {
      this.categories = this.navbar.getNavbar();
    });
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.categories.length) return;

      this.graphQL.getCategories().pipe(
        map(({ data }: { data: any }) => {
          let categories = flatten(data.categories) as Category[];
          this.navbar.setNavbar(
            categories.map(({ name, slug }) => ({ name, slug }))
          );
        }),
        take(1)
      ).subscribe();
    }, 2000);
  }
}
