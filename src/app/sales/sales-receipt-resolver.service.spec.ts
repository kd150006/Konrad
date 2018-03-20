import { TestBed, inject } from '@angular/core/testing';

import { SalesReceiptResolverService } from './sales-receipt-resolver.service';

describe('SalesReceiptResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReceiptResolverService]
    });
  });

  it('should be created', inject([SalesReceiptResolverService], (service: SalesReceiptResolverService) => {
    expect(service).toBeTruthy();
  }));
});
