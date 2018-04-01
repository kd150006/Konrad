import { LoaderComponent } from './../loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from './../messages/shared/message.service';
import { BasketHeaderService } from './../basket/shared/basket-header.service';
import { SalesComponent } from './sales.component';

import { ProductModule } from './../product/product.module';
import { LoaderModule } from './../loader/loader.module';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesReceiptComponent } from './sales-receipt/sales-receipt.component';

@NgModule({
  declarations: [SalesComponent, SalesReceiptComponent],
  imports: [CommonModule, FormsModule, ProductModule, SalesRoutingModule, LoaderModule],
  providers: [BasketHeaderService, MessageService]
})
export class SalesModule {}
