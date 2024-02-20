export interface Product {
  id: string;
  slug: string;
  name?: string;
  description?: string;
  image?: {
    id: string;
    url: string;
  };
  price?: number;
}