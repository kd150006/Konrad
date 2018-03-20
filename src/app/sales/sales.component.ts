import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { Product } from './../product/shared/product.model';
import { ProductSearchComponent } from './../product/product-search/product-search.component';
import { ProductService } from '../product/shared/product.service';
import { ProductListService } from './../product/shared/product-list-service';

import { BasketDetailService } from './../basket/shared/basket-detail.service';
import { BasketHeaderService } from './../basket/shared/basket-header.service';
import { BasketDetail } from './../basket/shared/basket-detail.model';
import { BasketHeader } from '../basket/shared/basket-header.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  private _remainingAmount: number;
  private _changeAmount: number;
  // private _sumTotal: number;
  @Input() givenAmount: number;
  @Input() selectedProduct: Product;

  basketHeader: BasketHeader;
  basketDetails: BasketDetail[];

  constructor(
    private location: Location,
    private router: Router,
    public productListService: ProductListService,
    private productService: ProductService,
    private basketHeaderService: BasketHeaderService,
    private basketDetailService: BasketDetailService
  ) {}

  ngOnInit() {
    this.givenAmount = 0.0;
    this._remainingAmount = 0.0;
    this._changeAmount = 0.0;
    this.basketHeader = new BasketHeader();
    this.basketHeader.basketDate = new Date();
    this.basketHeader.transactionType = 'Sale';
    this.basketHeader.sumTotal = 0.0;
  }
  // GETTERS
  get sumTotal() {
    this.basketHeader.sumTotal = this.productListService.sum;
    return this.basketHeader.sumTotal;
  }

  get changeAmount() {
    if (this.givenAmount - this.sumTotal <= 0) {
      return 0;
    } else {
      return this.givenAmount - this.sumTotal;
    }
  }

  get remainingAmount() {
    if (this.sumTotal - this.givenAmount < 0) {
      return 0;
    } else {
      return this.sumTotal - this.givenAmount;
    }
  }
  // ProductList methods
  clear(): void {
    this.productListService.clear();
  }

  remove(): void {
    this.productListService.remove(this.selectedProduct);
  }

  // Basket methods()
  checkout(): void {
    this.basketHeader.basketDetails = this.productListService.products.map(
      p => new BasketDetail(p.id, p.netPrice, 1)
    );
    this.basketHeaderService
      .postBasketHeader(this.basketHeader)
      .subscribe(() => this.showReceipt());
  }

  goBack(): void {
    this.location.back();
  }

  showReceipt(): void {
    this.router.navigate(['/sales/receipt']);
  }
}
