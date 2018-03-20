import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from './../messages/shared/message.service';
import { BasketHeaderService } from './../basket/shared/basket-header.service';
import { SalesComponent } from './sales.component';

import { ProductModule } from './../product/product.module';
import { SalesRoutingModule } from './sales-routing.module';

@NgModule({
  declarations: [SalesComponent],
  imports: [CommonModule, FormsModule, ProductModule, SalesRoutingModule],

  providers: [BasketHeaderService, MessageService]
})
export class SalesModule {}
