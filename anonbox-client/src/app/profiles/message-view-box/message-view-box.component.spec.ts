import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@anonbox-shared/shared.module';
import { MessageViewBoxComponent } from './message-view-box.component';

describe('MessageViewBoxComponent', () => {
  let component: MessageViewBoxComponent;
  let fixture: ComponentFixture<MessageViewBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessageViewBoxComponent
      ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageViewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
