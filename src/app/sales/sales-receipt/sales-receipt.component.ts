import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MessageService } from './../../messages/shared/message.service';
import { BasketHeaderService } from './../../basket/shared/basket-header.service';
import { BasketDetailService } from './../../basket/shared/basket-detail.service';
import { BasketHeader } from './../../basket/shared/basket-header.model';
import { BasketDetail } from './../../basket/shared/basket-detail.model';

@Component({
  selector: 'app-sales-receipt',
  templateUrl: './sales-receipt.component.html',
  styleUrls: ['./sales-receipt.component.css']
})
export class SalesReceiptComponent implements OnInit {
  basketHeader: BasketHeader;
  basketDetails: BasketDetail[];

  constructor(
    private basketHeaderService: BasketHeaderService,
    private basketDetailsService: BasketDetailService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { basketHeader: BasketHeader }) => {
      this.basketHeader = data.basketHeader;
    });
    console.log(this.basketHeader);
    this.getBasketDetailForBasketHeader(this.basketHeader.id);
    console.log(this.basketDetails);
  }

  getLatestBasketHeader(): void {
    this.basketHeaderService
      .getLatestBasketHeader()
      .subscribe(basketHeader => (this.basketHeader = basketHeader));
  }

  getBasketDetailForBasketHeader(id: number) {
    this.basketDetailsService
      .getDetails(id)
      .subscribe(basketDetails => (this.basketDetails = basketDetails));
  }
}
