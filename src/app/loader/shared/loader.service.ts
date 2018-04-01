import { Injectable } from '@angular/core';

import { LoaderComponent } from './../loader.component';

@Injectable()
export class LoaderService {
  private loaderCache = new Set<LoaderComponent>();

  _register(loader: LoaderComponent): void {
    this.loaderCache.add(loader);
  }

  _unregister(loaderToRemove: LoaderComponent): void {
    this.loaderCache.forEach(loader => {
      if (loader === loaderToRemove) {
        this.loaderCache.delete(loader);
      }
    });
  }

  show(loaderName: string): void {
    this.loaderCache.forEach(loader => {
      if (loader.name === loaderName) {
        loader.show = true;
      }
    });
  }

  hide(loaderName: string): void {
    this.loaderCache.forEach(loader => {
      if (loader.name === loaderName) {
        loader.show = false;
      }
    });
  }
}
