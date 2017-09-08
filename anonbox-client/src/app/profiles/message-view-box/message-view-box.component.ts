import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-view-box',
  templateUrl: './message-view-box.component.html',
  styleUrls: ['./message-view-box.component.scss']
})
export class MessageViewBoxComponent implements OnInit, OnChanges {

  @Input() box;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.box) {
      return;
    }
    console.log('change detected', this.box);
  }

}
