import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DropzoneService } from './dropzone.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as axios from 'axios';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
})
export class DropzoneComponent implements OnInit, OnDestroy {
  @Input('mat-dialog-close')
  tabIndex: number = 0;
  dialogResult: any;
  files: Array<any> = [];
  @ViewChild('Fileupload') FileuploadForm!: ElementRef;

  constructor(
    private dropzoneService: DropzoneService,
    public dialogRef: MatDialogRef<DropzoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; multiple: boolean }
  ) {}

  ngOnInit(): void {}

  async onFileChange(event: any) {
    const files = event.target ? event.target.files : event;
    console.log(event);
    for (let i = 0; i < this.files.length; i++) {
      //this.cancelIt(i);
    }
    if (files && files.length) {
      for (let val of files) {
        const value = {
          file: val,
          status: 'pending',
        };
        this.files.push(value);
        this.startUpload(this.files.length - 1);
      }
      if (event.target) {
        console.log(this.FileuploadForm);
        this.FileuploadForm.nativeElement.reset();
      }
      this.triggerFilepicker();
      this.tabIndex = 1;
    }
  }

  fileExists: boolean = false;

  filePick: Array<File> = [];
  triggerFilepicker() {
    this.filePick = this.files.filter((file) => file?.status == 'uploaded');
    this.fileExists = this.files.filter((file) => file).length ? true : false;
  }

  async startUpload(index: any) {
    this.files[index].status = 'initialize';
    this.dropzoneService
      .getSignedurl(this.files[index].file)
      .subscribe(async (response: any) => {
        console.log(response.data.signedurl);
        const result = await axios.default.post(
          response.data.signedurl,
          {},
          {
            headers: {
              'x-goog-resumable': 'start',
              'content-type': response.data.type,
            },
          }
        );
        this.files[index].locationUrl = result.headers.location;
        this.files[index].id = response.data.id;
        this.files[index].offset = 0;
        this.files[index].status = 'uploading';
        this.sendChunk(index);
      });
  }
  removeIt(index: number) {
    delete this.files[index];
    this.triggerFilepicker();
  }

  pauseIt(index: any) {
    this.files[index].status = 'paused';
    this.files[index].subscription.unsubscribe();
  }
  cancelIt(index: number) {
    if (this.files[index]) {
      this.files[index].status = 'cancelled';
      this.files[index].subscription?.unsubscribe();
    }
    this.triggerFilepicker();
  }
  async resumeIt(index: number) {
    this.dropzoneService
      .getStatus(this.files[index].locationUrl)
      .subscribe(
        (data) => {
          this.files[index].status = 'uploaded';
          this.triggerFilepicker();
        },
        (error) => {
          console.log(`error.headers`, error.headers);
          const range = error.headers
            .get('range')
            .split('=')
            .map((t: string) => t.split('-'))[1][1];
          console.log(`error`, range);
          this.files[index].status = 'uploading';
          this.files[index].offset = Math.ceil(range) + 1;
          console.log(`this.files[index]`, this.files, index);
          this.sendChunk(index);
        }
      )
      .add(() => {});
  }

  /**
   *
   * @param index
   * @description Send Chunk from a file.
   */
  sendChunk(index: any) {
    const chunkSize = 262144;
    let reader = new FileReader();
    let start = this.files[index].offset;
    let end = Math.min(
      this.files[index].offset + chunkSize,
      this.files[index].file.size
    );
    console.log('File Chunk', start, end);
    var chunk = this.files[index].file.slice(start, end);
    reader.readAsArrayBuffer(chunk);
    reader.onload = async () => {
      this.files[index].subscription = this.dropzoneService
        .sendChunk(
          this.files[index].locationUrl,
          reader.result,
          start,
          end - 1,
          this.files[index].file.size
        )
        .subscribe(
          (data) => {
            this.files[index].percentage = 100;
            console.log('File upload done..');
            this.files[index].status = 'uploaded';
            this.triggerFilepicker();
          },
          (error) => {
            if (error.status == 308) {
              this.files[index].offset += chunkSize;
              this.files[index].percentage = parseFloat(
                Math.min(
                  (this.files[index].offset / this.files[index].file.size) *
                    100,
                  100
                ).toFixed(2)
              );
              if (this.files[index].percentage < 100) {
                this.sendChunk(index);
              }
            } else {
              console.log(error);
              this.files[index].status = 'paused';
            }
            this.files[index].subscription.unsubscribe();
          }
        );
    };
  }
  filepicker() {
    console.log('filepick calling..');
    this.dialogResult = this.filePick;
    this.dialogRef.close({ event: 'Confirm', data: this.filePick });
  }

  closeIt() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnDestroy() {
    for (let i = 0; i < this.files.length; i++) {
      this.cancelIt(i);
    }
  }
}
