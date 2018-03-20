import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductListService } from './shared/product-list-service';
import { ProductService } from './shared/product.service';

import { MessageService } from './../messages/shared/message.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductSearchComponent],
  exports: [ProductSearchComponent],
  providers: [ProductService, ProductListService, MessageService]
})

export class ProductModule {}
