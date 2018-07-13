import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, map, tap  } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Film } from '../film';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  films: Film[] = [];
  titleControl = new FormControl();
  searchResults: Observable<Film[]>;
  selectedFilm: Film;
  errorMessage: string;

  constructor(private service: FilmService) { }

  ngOnInit() {
    this.films = this.service.getList();

    this.searchResults = this.titleControl.valueChanges
      .pipe(
        tap(() => this.selectedFilm = null),
        map((value: Film | string) =>
          typeof value === 'string' ? value : value.Title),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value =>
          value ? this.searchFilms(value) : of([]))
      );
  }

  searchFilms(title: string): Observable<Film[]> {
    return this.service.searchFilms(title)
      .pipe(
        tap(data => this.errorMessage = data.Error ? data.Error : ''),
        map(data => data.Search || [])
      )
  }

  displayFn(film?: Film): string | undefined {
    return film ? film.Title : undefined;
  }

  onSelect(option) {
    this.selectedFilm = <Film>option.option.value;
  }

  addFilm(film: Film) {
    this.service.addFilm(film);
    this.films.push(film);
  }

  removeFilm(index: number, film: Film) {
    this.service.removeFilm(film.imdbID);
    this.films.splice(index, 1);
  }

  trackById(index: number, film: Film): string { return film.imdbID }

  checkInList(id: string): boolean {
    return !!this.films.find(item => item.imdbID === id);
  }

}
