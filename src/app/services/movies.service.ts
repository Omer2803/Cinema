import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  readonly movieUrl = 'http://www.omdbapi.com/?apikey=56e4ac4';

  movies: Movie[];

  constructor(private http: HttpClient) { }

  getMovieById(imdbID: string): Observable<any> {
    return this.http.get<Movie>(this.movieUrl + '&i=' + imdbID);
  }

  getAllMovies(): Observable<any> {
    return this.http.get<any>(this.movieUrl + '&s=Batman&page=2');
  }
}
