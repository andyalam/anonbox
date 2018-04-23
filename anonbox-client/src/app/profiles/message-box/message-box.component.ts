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

  private _receiver: string;
  private _sender; // TODO: implement on special cases
  private _boxType: string;

  @Input() public set receiver(value: string) {
    this._receiver = value;
    this.focusMessageBox();
  }

  @Input() public set sender(value: string) {
    this._sender = value;
    this.focusMessageBox();
  }

  @Input() public set boxType(value: string) {
    this._boxType = value;
    this.focusMessageBox();
  }

  public isFormShown: boolean = true;
  public isFormLoading: boolean = false;
  public isSuccessShown: boolean = false;
  public errorMessage: string = undefined;

  @ViewChild('input')
  public input: ElementRef;

  constructor(private profilesService: ProfilesService) {
    this.initMessageForm();
  }

  public ngOnInit() {
    if (this._receiver === undefined || this.receiver === null) {
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
    if (this.input !== undefined && this.input !== null) {
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

  private handleMessageSuccess() {
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
