import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneComponent } from './dropzone.component';
import { DropzoneService } from './dropzone.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DndDirective } from './dropzone.directive';

@NgModule({
  declarations: [DropzoneComponent, DndDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    NgxDropzoneModule,
  ],
  providers: [DropzoneService],
})
export class DropzoneModule {}
