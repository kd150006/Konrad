import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { ReturnComponent } from './return.component';


const returnRoutes: Routes = [
  { path: 'return', component: ReturnComponent }
];

@NgModule({
  imports: [RouterModule.forChild(returnRoutes)],
  exports: [RouterModule]
})
export class ReturnRoutingModule {}
