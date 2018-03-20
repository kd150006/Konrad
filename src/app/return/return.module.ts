import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from './../messages/shared/message.service';
import { BasketHeaderService } from './../basket/shared/basket-header.service';
import { ProductModule } from './../product/product.module';

import { ReturnComponent } from './return.component';
import { ReturnRoutingModule } from './return-routing.module';

@NgModule({
  declarations: [ReturnComponent],
  imports: [CommonModule, FormsModule, ProductModule, ReturnRoutingModule],
  providers: [BasketHeaderService, MessageService]
})
export class ReturnModule {}
