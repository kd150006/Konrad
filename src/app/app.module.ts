import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Own modules */
import { DashBoardModule } from './dashboard/dashboard.module';
import { JournalModule } from './journal/journal.module';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';
import { CashdrawerModule } from './cashdrawer/cashdrawer.module';

/* Own components */
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DashBoardModule,
    JournalModule,
    CashdrawerModule,
    SalesModule,
    ProductModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
