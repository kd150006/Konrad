import { BasketHeaderService } from './../../basket/shared/basket-header.service';
import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { BasketHeader } from './../../basket/shared/basket-header.model';
import { BasketDetail } from './../../basket/shared/basket-detail.model';
import { BasketDetailService } from './../../basket/shared/basket-detail.service';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.css']
})
export class JournalDetailComponent implements OnInit {
  @Input() journal: BasketHeader;
  details: BasketDetail[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private basketHeaderService: BasketHeaderService,
    private basketDetailService: BasketDetailService
  ) {}

  ngOnInit() {
    this.getHeaderById();
    this.getDetailsByHeaderId();
  }
  getHeaderById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.basketHeaderService.getHeader(id).subscribe(header => this.journal = header);
  }

  getDetailsByHeaderId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.basketDetailService
      .getDetails(id)
      .subscribe(details => (this.details = details));
    // this.journalId = id;
  }

  goBack(): void {
    this.location.back();
  }
}
