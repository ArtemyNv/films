import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Film } from './film';

import { LocalStorageService } from '../local-storage.service';

const FILMS_API = 'http://www.omdbapi.com/';
const API_KEY = '74af8eaf';

@Injectable()
export class FilmService {

  constructor(private http: HttpClient, private lc: LocalStorageService) { }

  public searchFilms(title: string): Observable<any> {
    return this.http.get(`${FILMS_API}?apikey=${API_KEY}&s=${title}`)
  }

  public addFilm(film: Film) {
    const list = <Film[]>this.lc.getItem('filmsList') || [];
    list.push(film);
    this.lc.setItem('filmsList', list);
  }

  public getList(): Film[] {
    return this.lc.getItem('filmsList') || [];
  }

  public getFilm(id: string): Film | null {
    const list = <Film[]>this.lc.getItem('filmsList') || [];
    return list.find(item => item.imdbID === id);
  }

  public removeFilm(id: string) {
    const list = <Film[]>this.lc.getItem('filmsList') || [];
    const index = list.findIndex(item => item.imdbID === id);
    list.splice(index, 1);
    this.lc.setItem('filmsList', list);
  }
  
}
