import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { BasketDetail } from './../../basket/shared/basket-detail.model';
import { BasketHeader } from './../../basket/shared/basket-header.model';

import { BasketHeaderService } from './../../basket/shared/basket-header.service';
import { BasketDetailService } from './../../basket/shared/basket-detail.service';

@Component({
  selector: 'app-journal-search',
  templateUrl: './journal-search.component.html',
  styleUrls: ['./journal-search.component.css']
})
export class JournalSearchComponent implements OnInit {
  journals$: Observable<BasketHeader[]>;
  private searchTerms = new Subject<string>();
  filterStatus: string;

  constructor(private basketHeaderService: BasketHeaderService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.journals$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.basketHeaderService.searchBasketHeaders(term))
    );
  }
}
