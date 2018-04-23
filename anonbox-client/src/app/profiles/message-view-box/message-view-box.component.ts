import { Component, OnInit, Input } from '@angular/core';

import { Box } from '@anonbox-models/index';

@Component({
  selector: 'app-message-view-box',
  templateUrl: './message-view-box.component.html',
  styleUrls: ['./message-view-box.component.scss']
})
export class MessageViewBoxComponent implements OnInit {

  @Input()
  public box: Box;

  constructor() { }

  public ngOnInit() {
  }

}
