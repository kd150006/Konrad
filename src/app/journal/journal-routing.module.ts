import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';

const journalRoutes: Routes = [
  { path: 'journals', component: JournalListComponent },
  { path: 'journals/id/:id', component: JournalDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(journalRoutes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}
