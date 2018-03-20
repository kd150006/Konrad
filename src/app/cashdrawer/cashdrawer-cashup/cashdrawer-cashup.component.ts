import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Cashdrawer } from './../shared/cashdrawer.model';
import { CashdrawerService } from './../shared/cashdrawer.service';

@Component({
  selector: 'app-cashdrawer-cashup',
  templateUrl: './cashdrawer-cashup.component.html',
  styleUrls: ['./cashdrawer-cashup.component.css']
})
export class CashdrawerCashupComponent implements OnInit {
  @Input() countedAmount: number;
  cashdrawer: Cashdrawer;
  cashdrwId = 1;

  constructor(
    private location: Location,
    private cashdrawerService: CashdrawerService
  ) {}

  ngOnInit() {
    this.getCashdrawer();
    this.countedAmount = 0.0;
  }

  goBack(): void {
    this.location.back();
  }

  getCashdrawer() {
    this.cashdrawerService
      .getCashdrawer(this.cashdrwId)
      .subscribe(cashdrawer => (this.cashdrawer = cashdrawer));
  }

  save(): void {
    this.compareBalanceAndCount();
    this.cashdrawerService
      .updateCashdrawer(this.cashdrawer)
      .subscribe(() => this.goBack());
  }

  compareBalanceAndCount() {
    // If equal, everyhting is okay, nothing to do
    // If there is no money in the cashdrawer, just update it
    if (this.cashdrawer.balance === 0) {
      this.cashdrawer.balance = this.countedAmount;
    } else if (this.cashdrawer.balance < this.countedAmount) {
      // If count is more, add it to the balance
      this.cashdrawer.balance = this.cashdrawer.balance + this.countedAmount;
    } else {
      this.cashdrawer.balance = this.countedAmount;
    }
  }
}
