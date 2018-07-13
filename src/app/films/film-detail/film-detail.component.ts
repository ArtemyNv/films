import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmService } from '../film.service';
import { Film } from '../film';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  film: Film;

  constructor(
    private service: FilmService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getFilm();
  }

  getFilm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.film = this.service.getFilm(id);
  }

}
