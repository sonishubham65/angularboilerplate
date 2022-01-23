import { Component, OnInit } from '@angular/core';
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
  fnfileinput1(evt: any) {
    console.log(evt);
  }
}
