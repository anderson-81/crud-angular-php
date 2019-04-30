import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonDeactivateGuard } from '../guards/person-deactivate.guard';
import { PersonGuard } from '../guards/person.guard';

const routes: Routes = [
    {
        path: '',
        component: PersonComponent,
        canActivateChild: [PersonGuard]
    },
    {
        path: 'new',
        component: PersonFormComponent,
        canDeactivate: [PersonDeactivateGuard],
        canActivateChild: [PersonGuard]
    },
    {
        path: 'edit/:id',
        component: PersonFormComponent,
        canDeactivate: [PersonDeactivateGuard],
        canActivateChild: [PersonGuard]
    },
    {
        path: 'details/:id',
        component: PersonDetailsComponent,
        canActivateChild: [PersonGuard]
    }
]

// const routes: Routes = [{
//     path: '', component: PersonComponent, children:
//         [{
//             path: 'new',
//             component: PersonFormComponent,
//             canDeactivate: [PersonDeactivateGuard],
//             canActivateChild: [PersonGuard]
//         },
//         {
//             path: 'edit/:id',
//             component: PersonFormComponent,
//             canDeactivate: [PersonDeactivateGuard],
//             canActivateChild: [PersonGuard]
//         },
//         {
//             path: 'details/:id',
//             component: PersonDetailsComponent,
//             canActivateChild: [PersonGuard]
//         }]
// }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PersonRoutingModule { }