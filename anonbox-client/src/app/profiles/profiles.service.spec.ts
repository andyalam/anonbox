import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CoreModule } from '@anonbox-core/core.module';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let injector: TestBed;
  let service: ProfilesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ProfilesService]
    });

    injector = getTestBed();
    service = injector.get(ProfilesService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
