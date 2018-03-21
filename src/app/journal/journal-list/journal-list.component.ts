import { BasketDetail } from './../../basket/shared/basket-detail.model';
import { BasketDetailService } from './../../basket/shared/basket-detail.service';
import { Component, OnInit, Output } from '@angular/core';

import { BasketHeader } from './../../basket/shared/basket-header.model';
import { BasketHeaderService } from './../../basket/shared/basket-header.service';

@Component({
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.css']
})
export class JournalListComponent implements OnInit {
  journals: BasketHeader[];
  showMore: boolean;
  btnDetailsLabel: string;

  constructor(
    private basketHeaderService: BasketHeaderService,
    private basketDetailService: BasketDetailService
  ) {
    this.showMore = false;
    this.btnDetailsLabel = 'Show details';
  }

  ngOnInit() {
    this.getJournalHeaders();
  }

  getJournalHeaders() {
    this.basketHeaderService
      .getHeaders()
      .subscribe(basketHeaders => (this.journals = basketHeaders));
  }
}
