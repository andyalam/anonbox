import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit, AfterViewInit {

  messageForm: FormGroup;

  private _receiver;
  private _sender;
  private _boxType;

  @Input() set receiver(value) {
    this._receiver = value;
    this.focusMessageBox();
  };

  @Input() set sender(value) {
    this._sender = value;
    this.focusMessageBox();
  };

  @Input() set boxType(value) {
    this._boxType = value;
    this.focusMessageBox();
  };

  isFormShown: boolean = true;
  isFormLoading: boolean;
  isSuccessShown: boolean;
  errorMessage: string;

  @ViewChild('input') input;

  constructor(private profilesService: ProfilesService) {
    this.initMessageForm();
  }

  ngOnInit() {
    if (!this._receiver) {
      this.errorMessage = 'Message Box Failed to Initialize!';
      this.isFormShown = false;
    }
  }

  ngAfterViewInit() {
    this.focusMessageBox();
  }

  initMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl('')
    });
  }

  focusMessageBox() {
    this.input && this.input.nativeElement.focus();
  }

  onSubmitMessageForm() {
    this.isFormLoading = true;

    this.profilesService
      .postMessage(
        this._receiver,
        this.messageForm.value.message,
        this._boxType
      )
      .subscribe(
        this.handleMessageSuccess.bind(this),
        this.handleMessageError.bind(this)
      );
  }

  handleMessageSuccess(res) {
    this.isFormLoading = false;
    this.isSuccessShown = true;
  }

  handleMessageError(errRes) {
    this.isFormLoading = false;

    const { error } = errRes.json();
    this.errorMessage = error;
    setTimeout(() => this.errorMessage = null, 4000);
  }

}
