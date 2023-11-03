import { Products } from '../entity/product.entity';

export interface CreateProductResponse {
  status: string;
  message: string;
  data: {
    id: string;
  };
}

export interface GetProductsResponse {
  status: string;
  message: string;
  data: {
    limit: number;
    totalProducts: number;
    totalPages: number;
    next: string | null;
    currentPage: number | null;
    prev: string | null;
    items: Products[];
  };
}

export interface UpdateProductResponse {
  status: string;
  message: string;
  data: {
    items: Products;
  };
}

export interface DeleteProductResponse {
  status: string;
  message: string;
}

export interface GetDetailProductResponse {
  status: string;
  message: string;
  data: {
    items: Products;
  };
}
