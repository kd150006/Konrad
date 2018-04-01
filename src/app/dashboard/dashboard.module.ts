import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MessagesComponent } from './../messages/messages.component';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardBodyComponent,
    DashboardFooterComponent,
    MessagesComponent,
  ],
  exports: [
    DashboardHeaderComponent,
    DashboardBodyComponent,
    DashboardFooterComponent,
    MessagesComponent,
  ],
  imports: [CommonModule, FormsModule, DashboardRoutingModule],
  providers: []
})
export class DashBoardModule {}
