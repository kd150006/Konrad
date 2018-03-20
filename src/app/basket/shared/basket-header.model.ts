import { BasketDetail } from './basket-detail.model';

export class BasketHeader {

  id: number;
  basketDate: Date;
  sumTotal: number;
  status: string;
  basketDetails: BasketDetail[];
}
