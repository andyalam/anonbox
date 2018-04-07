import { TestBed, getTestBed } from '@angular/core/testing';

import { LocalStoreService } from './local-store.service';

describe('LocalStoreService', () => {
  let injector: TestBed;
  let service: LocalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStoreService]
    });

    injector = getTestBed();
    service = injector.get(LocalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
