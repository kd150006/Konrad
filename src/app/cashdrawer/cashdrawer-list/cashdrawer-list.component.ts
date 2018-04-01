import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Cashdrawer } from './../shared/cashdrawer.model';
import { CashdrawerService } from './../shared/cashdrawer.service';

@Component({
  selector: 'app-cashdrawer-list',
  templateUrl: './cashdrawer-list.component.html',
  styleUrls: ['./cashdrawer-list.component.css']
})
export class CashdrawerListComponent implements OnInit {
  cashdrawers: Cashdrawer[];

  constructor(
    private location: Location,
    private router: Router,
    private cashdrawerService: CashdrawerService
  ) {}

  ngOnInit() {
    this.getCashdrawers();
  }
  getCashdrawers() {
    this.cashdrawerService
      .getCashdrawers()
      .subscribe(cashdrawers => (this.cashdrawers = cashdrawers));
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
    //  this.location.back();
  }
}
