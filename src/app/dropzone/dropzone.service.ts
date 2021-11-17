import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const config = {
  signedurl: `${environment.backenduri}/file/generate/signedurl`,
};

@Injectable({
  providedIn: 'root',
})
export class DropzoneService {
  constructor(private http: HttpClient) {}
  sendChunk(
    url: string,
    data: any,
    start: number,
    end: number,
    totalSize: number
  ) {
    const range = `bytes ${start}-${end}/${totalSize}`;
    console.log(range);

    return this.http.put(url, data, {
      headers: new HttpHeaders({
        'Content-Range': range,
      }),
    });
  }

  getSignedurl(file: File) {
    const token = localStorage.getItem('token');
    return this.http.post(
      config.signedurl,
      {
        name: file.name,
        size: file.size,
        type: file.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getStatus(url: string) {
    const token = localStorage.getItem('token');
    return this.http.put(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        observe: 'response',
      },
    });
  }

  listfiles(args: {
    page: number;
    limit: number;
    name: string;
    count: boolean;
  }) {
    const where: any = {};
    if (args.name) {
      where.name = {
        value: args.name,
        relation: 'Equal',
      };
    }

    return this.http.post(
      `${environment.backenduri}/file/list`,
      {
        where: where,
        order: {
          createdAt: 'DESC',
        },
        page: args.page,
        limit: args.limit,
        count: args.count,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
