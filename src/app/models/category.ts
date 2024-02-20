import { Product } from './product';

export interface Category {
  id: string;
  slug: string;
  name?: string;
  products?: Product[];
}