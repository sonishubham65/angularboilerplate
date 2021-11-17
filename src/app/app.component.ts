import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  fileinput1 = { name: 'pics', multiple: true, label: 'Pick files' };
  fileinput2 = { name: 'cover', multiple: false, label: 'Pick one' };
  constructor() {}
  ngOnInit() {}
  fnfileinput1(evt: any) {
    console.log(evt);
  }
}
