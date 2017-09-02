import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Location} from '@angular/common';

import { SongService } from '../services/song.service';

@Component({
  selector: 'app-songDetail',
  templateUrl: './songDetail.component.html',
  styleUrls: ['./songDetail.component.less']
})
export class SongDetailComponent implements OnInit {

  song = {
    song_name: '',
    singer: ''
  };
  isLoading = true;

  constructor(private songService: SongService,
              private http: Http) { }

  ngOnInit() {
    this.getSongDetail();
  }

  getSongDetail() {
    let addressUrl = location.search.slice(1);
    let searchParams = new URLSearchParams(addressUrl);
    let id = searchParams.get('id');
    console.log("id:"+id);

    this.songService.getSongDetail(id).subscribe(
      data => this.song = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
