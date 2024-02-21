import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { flattenEntityResponseCollection as flatten } from 'strapi-flatten-graphql';
import { GET_CATEGORY } from '../queries';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../models/category';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit{
  private slug!: string;
  readonly url: string = environment.api_base_url;
  loading: boolean = true;
  category$!: Observable<Category>;

  constructor(private apollo: Apollo, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

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
    return this.apollo.watchQuery({ query: GET_CATEGORY, variables: { slug: this.slug } })
    .valueChanges.pipe(
      map(({ data, loading }: { data: any; loading: boolean }) => {
        this.loading = loading;
        return flatten(data.categories)[0] as Category;
      })
    );
  }
}
