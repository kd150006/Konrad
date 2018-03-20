import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { CashdrawerListComponent } from './cashdrawer-list/cashdrawer-list.component';
import { CashdrawerCashupComponent } from './cashdrawer-cashup/cashdrawer-cashup.component';

const cashdrawerRoutes: Routes = [
  { path: 'cashdrawers', component: CashdrawerListComponent },
  { path: 'cashdrawers/cashup', component: CashdrawerCashupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(cashdrawerRoutes)],
  exports: [RouterModule]
})
export class CashdrawerRoutingModule {}
