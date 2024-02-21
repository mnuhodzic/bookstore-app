import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { flattenEntityResponseCollection as flatten } from 'strapi-flatten-graphql';
import { GET_CATEGORIES } from '../queries';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatGridListModule, MatProgressSpinnerModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  loading: boolean = true;
  categories$!: Observable<Category[]>;

  constructor(private apollo: Apollo) {}
  
  ngOnInit(){
    this.categories$ = this.getCategories();
  }

  private getCategories(): Observable<Category[]> {
    return this.apollo.watchQuery({ query: GET_CATEGORIES })
    .valueChanges.pipe(
      map(({ data, loading }: { data: any; loading: boolean }) => {
        this.loading = loading;
        return flatten(data.categories) as Category[];
      })
    );
  }
}
