import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SongService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getSongs(): Observable<any> {
    return this.http.get('/api/getSongs').map(res => res.json());
  }

  addSong(song): Observable<any> {
    return this.http.post('/api/addSong', JSON.stringify(song), this.options);
  }

  getSongDetail(id): Observable<any> {
    return this.http.get(`/api/getSongDetail/${id}`).map(res => res.json());
  }

  deleteSong(song): Observable<any> {
    return this.http.delete(`/api/deleteSong/${song._id}`, this.options);
  }

  editSong(song): Observable<any> {
    return this.http.put(`/api/updateSong/${song._id}`, JSON.stringify(song), this.options);
  }

}
