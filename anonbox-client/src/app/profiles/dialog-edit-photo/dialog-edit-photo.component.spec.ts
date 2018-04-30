import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPhotoComponent } from './dialog-edit-photo.component';

describe('DialogEditPhotoComponent', () => {
  let component: DialogEditPhotoComponent;
  let fixture: ComponentFixture<DialogEditPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
