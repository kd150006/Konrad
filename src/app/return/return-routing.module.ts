import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { ReturnComponent } from './return.component';
import { ReturnDetailComponent } from './return-detail/return-detail.component';


const returnRoutes: Routes = [
  { path: 'return', component: ReturnComponent },
  { path: 'return/:id', component: ReturnDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(returnRoutes)],
  exports: [RouterModule]
})
export class ReturnRoutingModule {}
