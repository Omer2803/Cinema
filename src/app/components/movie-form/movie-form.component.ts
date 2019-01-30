import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

export const isValidDate = (c: FormControl) => {
  let date;
  if (Object.prototype.toString.call(c.value) === '[object Date]') {
    var d = c.value,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    date = [year, month, day].join('-');
  }
 const DATE_REGEXP = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return Promise.resolve(DATE_REGEXP.test(date || c.value) || c.value === '' ? null : {
    validateDate: {
      valid: false
    }
  });
}



@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  @Output() onSaved: EventEmitter<any> = new EventEmitter();
  @Input() movie: Movie = {};
  saveForm: any;
  submitted = false;

  constructor(private modalService: NgbModal, private movieService: MoviesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.movie.imdbID && !Guid.isGuid(this.movie.imdbID)) {
      this.movie.Year = new Date(parseInt(this.movie.Year.toString()), 0);
      this.getMovieById(this.movie.imdbID);
    } else {
      this.validateForm();
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'sm' });

  }

  onSubmit() {
    this.submitted = true;
    if (this.saveForm.invalid) {
      return;
    }
    this.saveForm.value.Title = this.saveForm.value.Title.replace(/[^\w\s]/gi, '');
    if (this.movie.imdbID) {
      this.updateMovie(this.saveForm.value);
    } else {
      this.onSaved.emit(this.saveForm.value);
    }

  }

  updateMovie(movieEdited: any) {
    this.movie.Director = movieEdited.Director;
    this.movie.Genre = movieEdited.Genre;
    this.movie.Runtime = movieEdited.Runtime;
    this.movie.Year = movieEdited.Year;
    let movieToEdit:any ={
      title:movieEdited.Title,
      movie:this.movie
    }
    this.onSaved.emit(movieToEdit);
  }

  get f() { return this.saveForm.controls; }

  getMovieById(imdbID: string) {
    this.movieService.getMovieById(imdbID).subscribe(movie => {
      this.movie.Title = movie.Title.replace(/[^\w\s]/gi, '');
      this.movie.Runtime = movie.Runtime;
      this.movie.Genre = movie.Genre;
      this.movie.Director = movie.Director;
      this.validateForm();
    }, err => console.log(err));
  }

  validateForm() {
    this.saveForm = this.formBuilder.group({
      Title: [this.movie.Title || '', Validators.required],
      Year: [this.movie.Year || '', Validators.required, isValidDate],
      Runtime: [this.movie.Runtime || '', Validators.required],
      Genre: [this.movie.Genre || '', Validators.required],
      Director: [this.movie.Director || '', Validators.required]
    })
  }
}



