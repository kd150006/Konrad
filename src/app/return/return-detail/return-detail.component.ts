import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { Product } from './../../product/shared/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { BasketHeader } from './../../basket/shared/basket-header.model';
import { BasketDetail } from '../../basket/shared/basket-detail.model';
import { BasketHeaderService } from './../../basket/shared/basket-header.service';
import { BasketDetailService } from './../../basket/shared/basket-detail.service';
import { Cashdrawer } from './../../cashdrawer/shared/cashdrawer.model';
import { CashdrawerService } from './../../cashdrawer/shared/cashdrawer.service';

import { MessageService } from '../../messages/shared/message.service';
import { ProductService } from '../../product/shared/product.service';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.css']
})
export class ReturnDetailComponent implements OnInit {
  basketHeader: BasketHeader;
  basketDetails: BasketDetail[];
  returnBasketHeader: BasketHeader;
  cashdrawer: Cashdrawer;
  product: Product;
  latestHeader: BasketHeader;
  productToUpdate: Product;

  constructor(
    private basketHeaderService: BasketHeaderService,
    private basketDetailService: BasketDetailService,
    private cashdrawerService: CashdrawerService,
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getBasketHeader();
    this.getBasketDetails();

    this.cashdrawerService
      .getCashdrawer(1)
      .subscribe(cashdrawer => (this.cashdrawer = cashdrawer));
  }

  getBasketHeader(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.basketHeaderService
      .getHeader(id)
      .subscribe(basketHeader => (this.basketHeader = basketHeader));
  }

  getBasketDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.basketDetailService
      .getDetails(id)
      .subscribe(basketDetails => (this.basketDetails = basketDetails));
  }

  return(): void {
    // Create new return basket header
    this.initReturnBasketHeader();
    this.returnBasketHeader.referenceBasketHeaderId = this.basketHeader.id;
    this.returnBasketHeader.sumTotal = this.basketHeader.sumTotal;
    // Add the details to the new basket
    this.returnBasketHeader.basketDetails = this.basketDetails.map(
      detail => new BasketDetail(detail.productId, detail.productPrice, 1)
    );
    // Write the new transaction
    this.basketHeaderService
      .postBasketHeader(this.returnBasketHeader)
      .subscribe();
    // Update the cashdrawer balance
    this.updateCashdrawerBalance(this.returnBasketHeader.sumTotal);
    // Update the product quantity
    this.updateProductQuantity();
    // mark the old basket header as used and navigate back to list
    this.basketHeader.returned = true;
    this.basketHeaderService
      .putBasketHeader(this.basketHeader)
      .subscribe(() => this.showReceipt());
  }

  updateCashdrawerBalance(sum: number): void {
    this.cashdrawer.balance -= sum;
    this.cashdrawerService.updateCashdrawer(this.cashdrawer).subscribe();
  }

  updateProductQuantity(): void {
    this.basketDetails.forEach(item => {
      item.product.quantity++;
      this.productService.updateProduct(item.product).subscribe();
    });
  }
  initReturnBasketHeader(): void {
    this.returnBasketHeader = new BasketHeader();
    this.returnBasketHeader.basketDate = new Date();
    this.returnBasketHeader.transactionType = 'Return';
    this.returnBasketHeader.basketDetails = [];
  }

  showReceipt(): void {
    this.router.navigate(['/return']);
  }

  goBack(): void {
    this.location.back();
  }
}
