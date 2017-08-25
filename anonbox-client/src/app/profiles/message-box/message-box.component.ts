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

  error: string;

  constructor(private profilesService: ProfilesService) {
    this.initMessageForm();
  }

  ngOnInit() {
    if (!this.receiver || !this.sender) {
      this.error = 'Message Box Failed to Initialize!';
    }
  }

  initMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl('')
    });
  }

  onSubmitMessageForm() {
    // TODO handle form submission here
  }

}
