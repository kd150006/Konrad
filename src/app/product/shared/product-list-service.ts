import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BasketHeader } from './../../basket/shared/basket-header.model';
import { BasketHeaderService } from './../../basket/shared/basket-header.service';
import { Product } from './product.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductListService {
  products: Product[] = [];
  private _sum: number;
  basketHdr: BasketHeader;

  constructor(private basketHeaderService: BasketHeaderService) {
    this._sum = 0.0;
  }

  add(addedProduct: Product) {
    this.products.push(addedProduct);
    this._sum += addedProduct.netPrice;
  }

  remove(removedProduct: Product) {
    const index: number = this.products.indexOf(removedProduct);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    this._sum -= removedProduct.netPrice;
  }

  clear() {
    this.products = [];
    this._sum = 0.0;
  }

  get sum() {
    return this._sum;
  }
}
