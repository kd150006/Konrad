import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from './../messages/shared/message.service';
import { BasketHeaderService } from './../basket/shared/basket-header.service';
import { BasketDetailService } from './../basket/shared/basket-detail.service';

import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalSearchComponent } from './journal-search/journal-search.component';

@NgModule({
  declarations: [JournalListComponent, JournalDetailComponent, JournalSearchComponent],
  imports: [CommonModule, FormsModule, JournalRoutingModule],
  exports: [JournalSearchComponent],
  providers: [BasketHeaderService, BasketDetailService, MessageService]
})
export class JournalModule {}
