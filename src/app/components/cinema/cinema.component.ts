import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie';
import { Guid } from 'guid-typescript';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  @ViewChild('content') errorModal: ElementRef;

  constructor(private movieService: MoviesService, private modalService: NgbModal) { }

  movies: any[] = []

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getAllMovies()
      .subscribe(
        response => {
          this.movies = response.Search;
        }, err => { console.log(err); })
  }

  addNewMovie(movie: Movie) {
    debugger;
    if (!movie.imdbID) {
      movie.imdbID = Guid.create().toString();
    }
    for (let index = 0; index < this.movies.length; index++) {
      if (this.movies[index].Title == movie.Title) {
        this.openmodalServiceService(this.errorModal);
        return;
      }
    }
    this.movies.push(movie);
    this.modalService.dismissAll();
  }

  openmodalServiceService(content: ElementRef) {
    this.modalService.open(content, { size: 'sm' });
  }
}
