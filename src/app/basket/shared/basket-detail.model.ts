import { Product } from '../../product/shared/product.model';

export class BasketDetail {
  constructor(
    public productId: number,
    public productPrice: number,
    public quantity: number,
    public product?: Product,
    public basketHeaderId?: number
  ) {}
}
