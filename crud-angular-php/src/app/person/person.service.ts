import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly API: string = `${environment.API}`;

  constructor(
    private httpClient: HttpClient) { }

  onExecution(person: Person, token: string, opc: number) {

    let data = this.createDataSubmit(person, token, opc);
    if (data != {}) {
      return this.httpClient.post(`${this.API}`, data).pipe(
        take(1), delay(5000), tap(response => response, error => error));
    }
    return null;
  }

  private createDataSubmit(person: Person, token: string, opc: number) {

    if (opc == 1) {
      return {
        "opcao": opc,
        "token": token,
        "nome": person.name,
        "email": person.email,
        "renda": person.salary.toString(),
        "dataNasc": person.birthday,
        "sexo": person.gender
      };
    }

    if (opc == 2) {
      return {
        "opcao": opc,
        "token": token,
        "codigo": person.id,
        "nome": person.name,
        "email": person.email,
        "renda": person.salary,
        "dataNasc": person.birthday,
        "sexo": person.gender
      };
    }

    if (opc == 3) {
      return {
        "opcao": opc,
        "token": token,
        "codigo": person.id,
      };
    }

    if (opc == 4) {
      return {
        "opcao": opc,
        "token": token,
        "dado": person.name,
      };
    }

    if (opc == 5) {
      return {
        "opcao": opc,
        "token": token,
        "dado": person.id,
      };
    }

    return {};
  }
}
