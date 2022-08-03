import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  fileinput1 = { name: 'pics', multiple: true, label: 'Pick files' };
  fileinput2 = { name: 'cover', multiple: false, label: 'Pick one' };
  properties = [];
  constructor(private appService: AppService) {}
  ngOnInit() {}
  setCookie() {
    this.appService
      .getCSRF()
      .pipe(
        finalize(() => {
          console.log('Request done..');
        })
      )
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  fnfileinput1(evt: any) {
    console.log(evt);
  }
}
