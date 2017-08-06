import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { SongService } from '../services/song.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {

  song = {};
  songs = [];
  isLoading = true;
  showAddModal = false;
  showEditModal = false;

  songForm: FormGroup;
  song_name = new FormControl('', Validators.required);
  singer = "";

  editSongObj = {};

  constructor(private songService: SongService,
              private formBuilder: FormBuilder,
              private http: Http,
              private router: Router,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getSongs();
    this.songForm = this.formBuilder.group({
      song_name: this.song_name,
      singer: this.singer,
      create_at: new Date().getTime(),
      update_at: new Date().getTime()
    });
  }

  getSongs() {
    this.songService.getSongs().subscribe(
      data => this.songs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addSong(){
    this.songService.addSong(this.songForm.value).subscribe(
      res => {
        this.songForm.reset();
        this.showAddModal = false;
        this.getSongs();
        this.toast.setMessage('添加成功', 'success');
      },
      error => console.log(error)
    );
  }

  gotoDetail(song){
    this.router.navigate(['/songDetail', 1],{ queryParams: { id: song._id } });
  }

  deleteSong(song){
    this.songService.deleteSong(song).subscribe(
        res => {
          this.getSongs();
          this.toast.setMessage('删除成功', 'success');
        },
        error => console.log(error)
    );
  }

  gotoEdit(song){
    this.showEditModal = true;
    this.song = song;
  }

  editSong(song) {
    song.update_at = new Date().getTime();
    this.songService.editSong(song).subscribe(
      res => {
        this.showEditModal = false;
        this.getSongs();
        this.toast.setMessage('修改成功', 'success');
      },
      error => console.log(error)
    );
  }

  cancelEdit(){
    this.showEditModal = false;
    this.getSongs();
  }
}
