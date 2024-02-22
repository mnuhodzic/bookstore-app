import { Injectable } from '@angular/core';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_PRODUCT,
  GET_SAME_CATEGORY_PRODUCTS,
} from '../queries';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  getCategory(slug: string) {
    return this.apollo.watchQuery({ 
      query: GET_CATEGORY, 
      variables: { slug } 
    }).valueChanges;
  }

  getCategories() {
    return this.apollo.watchQuery({ 
      query: GET_CATEGORIES 
    }).valueChanges;
  }

  getProduct(slug: string) {
    return this.apollo.watchQuery({ 
      query: GET_PRODUCT, 
      variables: { slug } 
    }).valueChanges;
  }

  getSameCategoryProducts(slug: string) {
    return this.apollo.watchQuery({
      query: GET_SAME_CATEGORY_PRODUCTS,
      variables: { slug },
    }).valueChanges;
  }
}
