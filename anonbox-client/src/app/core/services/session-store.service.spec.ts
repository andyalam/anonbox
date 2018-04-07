import { TestBed, getTestBed } from '@angular/core/testing';

import { SessionStoreService } from './session-store.service';

describe('SessionStoreService', () => {
  let injector: TestBed;
  let service: SessionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStoreService]
    });

    injector = getTestBed();
    service = injector.get(SessionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
