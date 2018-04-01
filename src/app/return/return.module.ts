import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from './../messages/shared/message.service';
import { BasketHeaderService } from './../basket/shared/basket-header.service';
import { LoaderService } from './../loader/shared/loader.service';

import { ProductModule } from './../product/product.module';
import { LoaderModule } from './../loader/loader.module';

import { ReturnComponent } from './return.component';
import { ReturnRoutingModule } from './return-routing.module';
import { ReturnReceiptComponent } from './return-receipt/return-receipt.component';
import { ReturnDetailComponent } from './return-detail/return-detail.component';

import { JournalModule } from './../journal/journal.module';

@NgModule({
  declarations: [ReturnComponent, ReturnDetailComponent, ReturnReceiptComponent],
  imports: [CommonModule, FormsModule, ProductModule, ReturnRoutingModule, LoaderModule, JournalModule],
  providers: [BasketHeaderService, MessageService, LoaderService]
})
export class ReturnModule {}
