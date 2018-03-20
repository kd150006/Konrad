import { BasketDetail } from './basket-detail.model';

export class BasketDto {
  basketDate: Date;
  sumTotal: number;
  basketDetails: BasketDetail[];
}
