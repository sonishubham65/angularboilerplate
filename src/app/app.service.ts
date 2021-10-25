import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  sendChunk(url:string, data:any, start:number, end:number, totalSize:number){
    const range = `bytes ${start}-${end}/${totalSize}`
    console.log('range', range)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Range': range
      })
    };
    return this.http.put(url,data,httpOptions)
  }
}
