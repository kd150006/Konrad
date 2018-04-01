import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() name: string;
  // @Input() show = false;

  private isShowing = false;
  loadingImage = '../../assets/images/spinner.gif';

  constructor(private loaderService: LoaderService) {}

  @Input()
  get show(): boolean {
    return this.isShowing;
  }
  @Output() showChange = new EventEmitter();

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
  }
  ngOnInit() {
    if (!this.name) {
      throw new Error('Loader must have a {{ name }} attribute.');
    }

    this.loaderService._register(this);
  }
  ngOnDestroy(): void {
    this.loaderService._unregister(this);
  }
}
