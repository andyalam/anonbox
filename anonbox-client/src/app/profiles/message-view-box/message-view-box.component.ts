import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-view-box',
  templateUrl: './message-view-box.component.html',
  styleUrls: ['./message-view-box.component.scss']
})
export class MessageViewBoxComponent implements OnInit {

  @Input() box;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // OLD: old code, was messing with using QS but ran into issues
    //      becaues of async nature of profile component
    // const profileParams = this.route.parent.snapshot.params;
    // const { id } = profileParams;
    // const { boxType } = this.route.snapshot.params;
    // console.log(boxType, id);

    console.log(this.box);
  }

  ngOnChanges() {
    if (!this.box) {
      return;
    }
    console.log('change detected', this.box);
  }

}
