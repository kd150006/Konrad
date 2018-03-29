import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { BasketHeader } from './../basket/shared/basket-header.model';
import { BasketHeaderService } from './../basket/shared/basket-header.service';

@Injectable()
export class ReturnReceiptResolver implements Resolve<BasketHeader> {
  basketHeader: BasketHeader;
  constructor(
    private basketHeaderService: BasketHeaderService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BasketHeader> {
    return this.basketHeaderService
      .getLatestBasketHeader('Return')
      .map(basketHeader => {
        if (basketHeader) {
          return basketHeader;
        } else {
          // id not found
          this.router.navigate(['/dashboard']);
          return null;
        }
      });
  }
}
