import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TokenService {

    private readonly API: string = `${environment.API}`;

    constructor(
        private httpClient: HttpClient) { }

    Token() {
        
        const data = {
            'opcao': 9
        }

        return this.httpClient.post(`${this.API}`, data).pipe(
            take(1), tap(response => response, error => error));
    }
}