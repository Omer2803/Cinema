import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-form',
  templateUrl: './remove-form.component.html',
  styleUrls: ['./remove-form.component.css']
})
export class RemoveFormComponent implements OnInit {

  @Input() movie: Movie
  @Output() onRemoved: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }
  
  ngOnInit() {
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  remove(imdbID: string) {
    this.onRemoved.emit(imdbID);
  }

}
