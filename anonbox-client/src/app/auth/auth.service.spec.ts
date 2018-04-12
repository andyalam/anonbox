import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AuthService } from './auth.service';
import { CoreModule } from '@anonbox-core/core.module';
import { Credentials, User } from '@anonbox-models/index';
import { API } from '@anonbox-shared/config';

describe('AuthService', () => {
  let injector: TestBed;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreModule
      ],
      providers: [
        AuthService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });

    injector = getTestBed();
    authService = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('register', () => {
    it('should return an Observable<Credentials>', () => {
      authService
        .register('test@test.com', 'test', 'password')
        .subscribe((res: Credentials) => {
          expect(res).toEqual(new Credentials({
            token: '123abc',
            user: new User({
              username: 'test',
              email: 'test@test.com'
            })
          }));
        });

      const req = httpMock.expectOne(`${API}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: 'test@test.com',
        username: 'test',
        password: 'password'
      });
      req.flush({
        token: '123abc',
        user: {
          username: 'test',
          email: 'test@test.com'
        }
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
