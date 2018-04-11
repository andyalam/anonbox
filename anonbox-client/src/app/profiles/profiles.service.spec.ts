import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CoreModule } from '@anonbox-core/core.module';
import { ProfilesService } from './profiles.service';

import { API } from '@anonbox-shared/config';
import { Box, Profile, Message, User } from '@anonbox-models/index';

describe('ProfilesService', () => {
  let injector: TestBed;
  let profileService: ProfilesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ProfilesService]
    });

    injector = getTestBed();
    profileService = injector.get(ProfilesService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(profileService).toBeTruthy();
  });

  describe('getProfile', () => {
    it('should return an Observable<Profile>', () => {
      profileService
        .getProfile('andy')
        .subscribe((profile: Profile) => {
          expect(profile).toEqual(new Profile({
            user: new User({
              username: 'andy',
              email: 'test@test.com'
            }),
            boxes: [new Box({})]
          }));
        });

      const req = httpMock.expectOne(`${API}/profile/andy`);
      expect(req.request.method).toBe('GET');
      req.flush({
        user: {
          username: 'andy',
          email: 'test@test.com'
        },
        boxes: [{}]
      });
    });
  });

  describe('postMessage', () => {
    it('should return an Observable<void>', () => {
      profileService
        .postMessage('andy', 'hello mah peeps', 'GENERAL')
        .subscribe(res => expect(res).toEqual(null));

      const req = httpMock.expectOne(`${API}/profile/andy`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        message: 'hello mah peeps',
        boxType: 'GENERAL'
      });
      req.flush(null);
    });
  });

  describe('createBox', () => {
    it('should return an Observable<Box>', () => {
      profileService
        .createBox('andy', 'GENERAL', 'testing my general box')
        .subscribe((box: Box) => {
          expect(box).toEqual(new Box({
            username: 'andy',
            boxType: 'GENERAL',
            description: 'testing my general box',
            messages: []
          }));
        });

      const req = httpMock.expectOne(`${API}/box`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        username: 'andy',
        boxType: 'GENERAL',
        description: 'testing my general box',
      });
      req.flush({
        username: 'andy',
        boxType: 'GENERAL',
        description: 'testing my general box',
        messages: []
      });
    });
  });

  describe('deleteBox', () => {
    it('should return an Observable<Box>', () => {
      profileService
        .deleteBox(new Box({ boxType: 'ANYTHING' }))
        .subscribe((res: Box) => {
          expect(res).toEqual(new Box({ boxType: 'ANYTHING' }));
        });

      const req = httpMock.expectOne(`${API}/box/ANYTHING`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ boxType: 'ANYTHING' });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

});
