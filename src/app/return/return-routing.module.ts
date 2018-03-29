import { JournalModule } from './../journal/journal.module';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { ReturnComponent } from './return.component';
import { ReturnDetailComponent } from './return-detail/return-detail.component';
import { ReturnReceiptComponent } from './return-receipt/return-receipt.component';

import { ReturnReceiptResolver } from './return-receipt-resolver.service';

const returnRoutes: Routes = [
  { path: 'return', component: ReturnComponent },
  { path: 'return/:id', component: ReturnDetailComponent },
  { path: 'return/receipt', component: ReturnReceiptComponent, resolve: { basketHeader: ReturnReceiptResolver } }

];

@NgModule({
  imports: [RouterModule.forChild(returnRoutes)],
  exports: [RouterModule],
  providers: [ReturnReceiptResolver]
})
export class ReturnRoutingModule {}
