import { BasketDetail } from './../../basket/shared/basket-detail.model';
import { BasketDetailService } from './../../basket/shared/basket-detail.service';
import { Component, OnInit } from '@angular/core';

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

  toggleDetails() {
    if (this.showMore) {
      this.showMore = false;
      this.btnDetailsLabel = 'Show details';
    } else {
      this.showMore = true;
      this.btnDetailsLabel = 'Hide Details';
    }
  }

  getJournalHeaders() {
    this.basketHeaderService
      .getHeaders()
      .subscribe(basketHeaders => (this.journals = basketHeaders));
  }
}
