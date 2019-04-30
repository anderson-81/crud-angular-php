import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'person',
        loadChildren: './person/person.module#PersonModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    { path: 'home', component: HomeComponent },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    { path: '404', component: PageErrorComponent },
    { path: '505', component: PageErrorComponent },
    { path: '', redirectTo: "/home", pathMatch: "full" },
    { path: '**', component: PageErrorComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}