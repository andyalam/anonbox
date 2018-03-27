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

  public messageForm: FormGroup;

  private _receiver;
  private _sender;
  private _boxType;

  @Input() public set receiver(value) {
    this._receiver = value;
    this.focusMessageBox();
  }

  @Input() public set sender(value) {
    this._sender = value;
    this.focusMessageBox();
  }

  @Input() public set boxType(value) {
    this._boxType = value;
    this.focusMessageBox();
  }

  public isFormShown: boolean = true;
  public isFormLoading: boolean;
  public isSuccessShown: boolean;
  public errorMessage: string;

  @ViewChild('input') public input;

  constructor(private profilesService: ProfilesService) {
    this.initMessageForm();
  }

  public ngOnInit() {
    if (!this._receiver) {
      this.errorMessage = 'Message Box Failed to Initialize!';
      this.isFormShown = false;
    }
  }

  public ngAfterViewInit() {
    this.focusMessageBox();
  }

  private initMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl('')
    });
  }

  private focusMessageBox() {
    if (this.input) {
      this.input.nativeElement.focus();
    }
  }

  public onSubmitMessageForm() {
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

  private handleMessageSuccess(res) {
    this.isFormLoading = false;
    this.isSuccessShown = true;
  }

  private handleMessageError(errRes) {
    this.isFormLoading = false;

    const { error } = errRes;
    this.errorMessage = error;
    setTimeout(() => this.errorMessage = null, 4000);
  }

}
