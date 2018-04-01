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

import { Cashdrawer } from './../cashdrawer/shared/cashdrawer.model';
import { CashdrawerService } from './../cashdrawer/shared/cashdrawer.service';

import { LoaderService } from './../loader/shared/loader.service';

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
  products: Product[] = [];

  cashdrawer: Cashdrawer;

  loaderShowing = false;

  constructor(
    private location: Location,
    private router: Router,
    public productListService: ProductListService,
    private productService: ProductService,
    private basketHeaderService: BasketHeaderService,
    private basketDetailService: BasketDetailService,
    private cashdrawerService: CashdrawerService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.initSalesTrx();
    this.cashdrawerService
      .getCashdrawer(1)
      .subscribe(cashdrawer => (this.cashdrawer = cashdrawer));
  }
  // GETTERS
  get sumTotal() {
    this.basketHeader.sumTotal = this.productListService.sum;
    return Math.round(this.basketHeader.sumTotal * 100) / 100;
  }

  get changeAmount() {
    if (this.givenAmount - this.sumTotal <= 0) {
      return 0;
    } else {
      return Math.round((this.givenAmount - this.sumTotal) * 100) / 100;
    }
  }

  get remainingAmount() {
    if (this.sumTotal - this.givenAmount < 0) {
      return 0;
    } else {
      return Math.round ( (this.sumTotal - this.givenAmount) * 100) / 100;
    }
  }

  clear(): void {
    this.productListService.clear();
  }

  remove(): void {
    this.productListService.remove(this.selectedProduct);
  }

  checkout(): void {
    this.loaderShowing = true;
    this.loaderService.show('saleLoader');
    this.basketHeader.basketDetails = this.productListService.products.map(
      p => new BasketDetail(p.id, p.netPrice, 1)
    );
    // Update the product quantity
    this.productListService.products.forEach(item => {
      this.updateProductQuantity(this.products, item);
    });
    this.productService.updateProducts(this.products).subscribe();
    // Update the cashdrawer balance
    this.updateCashdrawerBalance(this.basketHeader.sumTotal);
    // Write the transaction and display the receipt
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

  updateCashdrawerBalance(sum: number): void {
    this.cashdrawer.balance += sum;
    this.cashdrawerService.updateCashdrawer(this.cashdrawer).subscribe();
  }

  updateProductQuantity(products: Product[], product: Product): Product[] {
    let cnt = 0;
    let resultCnt = 0;

    if (this.products.length < 1) {
      product.quantity--;
      this.products.push(product);
    } else {
      while (cnt < products.length) {
        if (this.compareByProductId(products[cnt], product) === 0) {
          resultCnt++;
        }
        cnt++;
      }
      if (resultCnt < 1) {
        product.quantity--;
        this.products.push(product);
      } else {
        const index = this.products.findIndex(p => p.id === product.id);
        this.products[index].quantity -= resultCnt;
      }
    }
    return this.products;
  }

  compareByProductId(a: Product, b: Product) {
    if (a.id === b.id) {
      return 0;
    } else {
      return -1;
    }
  }

  initSalesTrx(): void {
    this.givenAmount = 0.0;
    this._remainingAmount = 0.0;
    this._changeAmount = 0.0;
    this.basketHeader = new BasketHeader();
    this.basketHeader.basketDate = new Date();
    this.basketHeader.transactionType = 'Sale';
    this.basketHeader.sumTotal = 0.0;
  }
}
