import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, take, delay } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API: string = `${environment.API}`;

  enable = new EventEmitter<boolean>();

  logged: boolean = false;

  constructor(
    private httpClient: HttpClient) { }

  onSubmit(user: User, token: string) {

    const data = {
      'opcao': 6,
      'token': token,
      'login': user.login,
      'senha': user.password
    }

    return this.httpClient.post(`${this.API}`, data).pipe(
      take(1), delay(1000), tap(response => response, error => error));
  }

  onLogout() {

    const data = {
      'opcao': 8
    }

    return this.httpClient.post(`${this.API}`, data).pipe(
      take(1), delay(1000), tap(response => response, error => error));
  }

  checkLogin() {

    const data = {
      'opcao': 7
    }

    return this.httpClient.post(`${this.API}`, data)
      .pipe(take(1),
        delay(1000),
        tap(response => {
          response
          this.logged = (response == 1 ? true : false);
        }, error => error));
  }

  isLogged() {
    console.log(this.logged);
    return this.logged;
  }
}
