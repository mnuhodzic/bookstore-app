import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { flattenEntityResponseCollection as flatten } from 'strapi-flatten-graphql';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { GET_PRODUCT, GET_SAME_CATEGORY_PRODUCTS } from '../queries';
import { environment } from '../../environments/environment.development';
import { CountdownService } from '../services/countdown.service';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButton, MatProgressSpinnerModule, CurrencyPipe, MatIconModule, MatTooltipModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  private slug!: string;
  readonly url: string = environment.api_base_url;
  loading: boolean = true;
  product$!: Observable<Product>;
  sameCategoryProducts$!: Observable<Product[]>;
  countdown$!: Observable<string>;

  constructor(private apollo: Apollo, private route: ActivatedRoute, private countdown: CountdownService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.slug = paramMap.get('slug') as string;
      // rerender data on url change
      this.product$ = this.getProduct();
      this.sameCategoryProducts$ = this.getSameCategoryProducts();
    });
    this.product$ = this.getProduct();
    this.sameCategoryProducts$ = this.getSameCategoryProducts();
    this.countdown$ = this.countdown.timeRemaining$;
  }

  private getProduct(): Observable<Product> {
    return this.apollo
      .watchQuery({ query: GET_PRODUCT, variables: { slug: this.slug } })
      .valueChanges.pipe(
        map(({ data, loading }: { data: any; loading: boolean }) => {
          this.loading = loading;
          return flatten(data.products)[0] as Product;
        })
      );
  }

  private getSameCategoryProducts(): Observable<Product[]> {
    return this.apollo
      .watchQuery({
        query: GET_SAME_CATEGORY_PRODUCTS,
        variables: { slug: this.slug },
      })
      .valueChanges.pipe(
        map(({ data, loading }: { data: any; loading: boolean }) => {
          this.loading = loading;
          let products = flatten(data.categories)[0]['products'] as Product[];
          products = products?.filter((product) => product.slug !== this.slug);
          return products.slice(0, 3);
        })
      );
  }
}
