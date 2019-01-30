import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @ViewChild('errorModal') errorModal: ElementRef;

  constructor(private modalService: NgbModal) { }

  @Input() movies: Movie[] = []

  ngOnInit() {
  }

  removeMovie(imdbID: string) {
    var index = this.movies.findIndex(m => m.imdbID == imdbID);
    this.movies.splice(index, 1);
  }

  saveMovieDetails(movieToEdit: any) {
    if (movieToEdit.movie.Title != movieToEdit.title) {
      for (let index = 0; index < this.movies.length; index++) {
        if (this.movies[index].Title == movieToEdit.title) {
          this.openModal(this.errorModal);
          return;
        }
      }
    }
    movieToEdit.movie.Title = movieToEdit.title;
    this.modalService.dismissAll();
  }
  openModal(temp: ElementRef) {
    this.modalService.open(temp, { size: 'sm' });
  }
}
