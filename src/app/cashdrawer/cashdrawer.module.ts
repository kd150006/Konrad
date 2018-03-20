import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashdrawerListComponent } from './cashdrawer-list/cashdrawer-list.component';
import { CashdrawerCashupComponent } from './cashdrawer-cashup/cashdrawer-cashup.component';
import { CashdrawerService } from './shared/cashdrawer.service';
import { CashdrawerRoutingModule } from './cashdrawer-routing.module';

import { MessageService } from './../messages/shared/message.service';

@NgModule({
  imports: [CommonModule, FormsModule, CashdrawerRoutingModule],
  declarations: [CashdrawerListComponent, CashdrawerCashupComponent],
  exports: [],
  providers: [CashdrawerService, MessageService]
})
export class CashdrawerModule {}
