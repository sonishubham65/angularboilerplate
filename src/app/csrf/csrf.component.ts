import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CsrfService } from '../csrf.service';

@Component({
  selector: 'app-csrf',
  templateUrl: './csrf.component.html',
  styleUrls: ['./csrf.component.css'],
})
export class CsrfComponent implements OnInit {
  constructor(private csrfService: CsrfService) {}

  ngOnInit(): void {}

  csrf() {
    this.csrfService
      .login()
      .pipe(
        finalize(() => {
          console.log('Request done..');
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
