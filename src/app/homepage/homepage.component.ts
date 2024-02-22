import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { flattenEntityResponseCollection as flatten } from 'strapi-flatten-graphql';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment.development';
import { GraphQLService } from '../services/graph-ql.service';
import { NavbarService } from '../services/navbar.service';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  loading: boolean = true;
  categories$!: Observable<Category[]>;
  readonly url: string = environment.api_base_url;

  constructor(private graphQL: GraphQLService, private navbar: NavbarService) {}

  ngOnInit() {
    this.categories$ = this.graphQL.getCategories().pipe(
      map(({ data, loading }: { data: any; loading: boolean }) => {
        this.loading = loading;
        let categories = flatten(data.categories) as Category[];
        this.navbar.setNavbar(categories.map(({ name, slug }) => ({ name, slug }))); // sets the navbar dynamically
        return categories;
      })
    );
  }
}
