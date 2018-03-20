import { BasketDetail } from './basket-detail.model';

export class BasketHeader {
  basketDate: Date;
  id: number;
  sumTotal: number;
  referenceBasketHeaderId?: number;
  status: string;
  transactionType: string;
  basketDetails: BasketDetail[];
}
