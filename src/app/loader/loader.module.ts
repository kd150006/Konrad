import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService } from './shared/loader.service';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  exports: [
    LoaderComponent
  ],
  imports: [CommonModule, FormsModule],
  providers: [LoaderService]
})
export class LoaderModule {}
