import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  percentage:string = "0";

  constructor(private appService:AppService){}
  ngOnInit(){
    
  }
  
  onFileChange(event:any) {
    this.percentage = "0"; 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let offset = 1
      let url = 'https://storage.googleapis.com/upload/storage/v1/b/mcgm-properties/o?uploadType=resumable&name=abc.zip&upload_id=ADPycdvvrgj3S46BZj_GTV-Z2L3bp6A3sfFtHi3PBWx_qwDbM8k06yD_kcEjdz8dvdcZHxtHooNUfKdsJLEZTYipKTbYcEh9Jw';
      this.sendChunk(url, file, offset, file.size)
    }
  }

  sendChunk(url:string, file:any, offset:number, fileSize:number){
    const chunkSize = 262144;
    this.percentage = (Math.min((offset/fileSize)*100,100)).toFixed(2)
    if(offset-chunkSize<fileSize){
      let reader = new FileReader();
    
      let start = offset-1;
      let end = Math.min(offset + chunkSize - 1, fileSize)
      console.log(start, end)
      var chunk = file.slice(start, end);

      reader.readAsArrayBuffer(chunk);
    
      reader.onload = async () => {
        console.log(reader.result);

        const subs = this.appService.sendChunk(url, reader.result, start, end-1, fileSize).subscribe(data=>{
          console.log(data)
          subs.unsubscribe()
          offset += chunkSize
          this.sendChunk(url,file, offset, fileSize);
        },(error)=>{
          console.log(error)
          if(error.status==308){
            subs.unsubscribe()
            offset += chunkSize
            this.sendChunk(url,file, offset, fileSize);
          }
        });
      };
    }
  }
}
