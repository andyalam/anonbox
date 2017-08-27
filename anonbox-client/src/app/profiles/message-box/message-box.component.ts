import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  messageForm: FormGroup;
  @Input() receiver;
  @Input() sender;

  isFormShown: boolean = true;
  isFormLoading: boolean;
  isSuccessShown: boolean;
  errorMessage: string;

  constructor(private profilesService: ProfilesService) {
    this.initMessageForm();
  }

  ngOnInit() {
    if (!this.receiver) {
      this.errorMessage = 'Message Box Failed to Initialize!';
      this.isFormShown = false;
    }
  }

  initMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl('')
    });
  }

  onSubmitMessageForm() {
    this.isFormLoading = true;

    this.profilesService
      .postMessage(this.receiver, this.messageForm.value.message)
      .subscribe(
        this.handleMessageSuccess.bind(this),
        this.handleMessageError.bind(this)
      );
  }

  handleMessageSuccess(res) {
    this.isFormLoading = false;
    this.isSuccessShown = true;
    console.log(res);
  }

  handleMessageError(errRes) {
    this.isFormLoading = false;

    const { error } = errRes.json();
    this.errorMessage = error;
    setTimeout(() => this.errorMessage = null, 4000);
  }

}
