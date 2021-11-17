import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DropzoneComponent } from '../dropzone/dropzone.component';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit, OnChanges {
  @Input() intake: { label: string } = { label: '' };
  @Output() outtake = new EventEmitter();
  label: string = '';
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DropzoneComponent, {
      width: '750px',
      data: { ...this.intake },
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      this.outtake.emit(result);
    });
  }
  ngOnChanges(evt: any) {
    console.log(this.intake);
    this.label = this.intake.label;
  }
}
