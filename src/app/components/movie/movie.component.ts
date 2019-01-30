import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor() { }

  @Input() movie: Movie;
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onSaved(movie: Movie) {
    this.onSave.emit(movie);
  }

  onRemoved(imdbID: string) {
    this.onRemove.emit(imdbID);
  }
}
