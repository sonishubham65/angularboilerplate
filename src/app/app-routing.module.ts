import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsrfComponent } from './csrf/csrf.component';

const routes: Routes = [
  {
    path: 'csrf',
    component: CsrfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
