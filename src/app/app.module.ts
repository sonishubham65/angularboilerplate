import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FileComponent } from './file/file.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DropzoneModule } from './dropzone/dropzone.module';
import { CsrfComponent } from './csrf/csrf.component';
import { CSRF } from './interceptors/csrf';
@NgModule({
  declarations: [AppComponent, FileComponent, CsrfComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrf-token',
      headerName: 'csrf-token',
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    DropzoneModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CSRF, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
