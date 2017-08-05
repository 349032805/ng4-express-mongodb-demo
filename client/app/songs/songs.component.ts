import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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

  // addCatForm: FormGroup;
  // name = new FormControl('', Validators.required);
  // age = new FormControl('', Validators.required);
  // weight = new FormControl('', Validators.required);

  constructor(private songService: SongService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getSongs();
    // this.addCatForm = this.formBuilder.group({
    //   name: this.name,
    //   age: this.age,
    //   weight: this.weight
    // });
  }

  getSongs() {
    this.songService.getSongs().subscribe(
      data => this.songs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
