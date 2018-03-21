import { BasketHeader } from './../basket/shared/basket-header.model';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, filter } from 'rxjs/operators';

import { MessageService } from './../messages/shared/message.service';
import { BasketHeaderService } from './../basket/shared/basket-header.service';
import { BasketDetailService } from './../basket/shared/basket-detail.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  basketHeaders: BasketHeader[];

  constructor(
    private messageService: MessageService,
    private basketHeaderService: BasketHeaderService,
    private basketDetailService: BasketDetailService
  ) {}

  ngOnInit() {
    this.getBasketHeadersByTrxType('Sale');
  }

  getBasketHeadersByTrxType(trxType: string): void {
    this.basketHeaderService
      .getBasketHeadersByTrxType(trxType)
      .subscribe(basketHeaders => (this.basketHeaders = basketHeaders));
  }
}
