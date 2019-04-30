import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PersonFormComponent } from '../person/person-form/person-form.component';

@Injectable({ providedIn: 'root' })
export class PersonDeactivateGuard implements CanDeactivate<PersonFormComponent> {
    canDeactivate(
        component: PersonFormComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return component.isChange();
    }
}