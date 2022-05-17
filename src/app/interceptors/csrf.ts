import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class CSRF implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const modifiedReq = req.clone({});
    return from(
      next
        .handle(modifiedReq)
        .pipe(
          map((event) => event),
          catchError((err: HttpErrorResponse) => {
            return throwError(err);
          })
        )
        .toPromise()
    );
  }
}
