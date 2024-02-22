import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { flattenEntityResponseCollection as flatten } from 'strapi-flatten-graphql';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../models/category';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { GraphQLService } from '../services/graph-ql.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule, CurrencyPipe, MatGridListModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit{
  private slug!: string;
  readonly url: string = environment.api_base_url;
  loading: boolean = true;
  category$!: Observable<Category>;

  constructor(private route: ActivatedRoute, private graphQL: GraphQLService, private cdr: ChangeDetectorRef) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap) => {
      this.slug = paramMap.get('slug') as string;
      // rerender data on url change
      this.category$ = this.getCategory();
      this.cdr.detectChanges();
    });
  
    this.category$ = this.getCategory();
  }

  private getCategory(): Observable<Category> {
    return this.graphQL.getCategory(this.slug).pipe(
      map(({ data, loading }: { data: any; loading: boolean }) => {
        this.loading = loading;
        return flatten(data.categories)[0] as Category;
      })
    );
  }
}
