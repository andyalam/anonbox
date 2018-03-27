import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  public errorMessage: string;
  public errorCode: number;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data.message;
        this.errorCode = data.errorCode;
      }
    );
  }

}
