import { Product } from './product';

export interface Category {
  id: string;
  slug: string;
  name?: string;
  image?: {
    id: string;
    url: string;
  };
  products?: Product[];
}