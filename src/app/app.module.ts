import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MoviesService } from './services/movies.service';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CinemaComponent } from './components/cinema/cinema.component';
import { RemoveFormComponent } from "./components/remove-form/remove-form.component";
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieListComponent,
    MovieFormComponent,
    CinemaComponent,
    RemoveFormComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MoviesService , DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
