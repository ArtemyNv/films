import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public getItem(name: string) {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : null;
  }

  public setItem(name: string, data: object) {
    return localStorage.setItem(name, JSON.stringify(data));
  }

  public delItem(name: string) {
    return localStorage.removeItem(name);
  }
}
