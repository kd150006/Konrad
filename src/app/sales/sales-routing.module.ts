import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { SalesComponent } from './sales.component';
import { SalesReceiptComponent } from './sales-receipt/sales-receipt.component';

import { SalesReceiptResolver } from './sales-receipt-resolver.service';


const salesRoutes: Routes = [
  { path: 'sales', component: SalesComponent },
  { path: 'sales/receipt', component: SalesReceiptComponent, resolve: { basketHeader: SalesReceiptResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule],
  providers: [SalesReceiptResolver]
})
export class SalesRoutingModule {}
