import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CoreModule } from '@anonbox-core/core.module';

describe('AuthGuard', () => {
  let injector: TestBed;
  let guard: AuthGuard;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreModule
      ],
      providers: [
        AuthGuard,
        AuthService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });

    injector = getTestBed();
    guard = injector.get(AuthGuard);
    httpMock = injector.get(HttpTestingController);
  });

  it('should ...',() => {
    expect(guard).toBeTruthy();
  });
});
