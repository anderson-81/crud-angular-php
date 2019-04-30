import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './login/login.service';
import { Alert } from './shared/components/alert/alert';
import { AlertService } from './shared/services/alert.service';

declare const showModal: any;
declare const closeModal: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    alert: Alert;

    enable: boolean = null;

    title: string = '';

    constructor(
        private loginService: LoginService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    if (this.router.url.includes('home')) {
                        this.title = 'Home';
                    }
                    if (this.router.url.includes('login')) {
                        this.title = 'Login';
                    }
                    if (this.router.url.includes('details')) {
                        this.title = 'Details';
                    }
                    if (this.router.url.includes('edit')) {
                        this.title = 'Edit';
                    }
                    if (this.router.url.includes('new')) {
                        this.title = 'Create';
                    }
                    if (this.router.url == '/person') {
                        this.title = 'List';
                    }
                    if (this.router.url.includes('404')) {
                        this.title = 'Error';
                    }
                    if (this.router.url.includes('505')) {
                        this.title = 'Error';
                    }
                }
            }
        );

        this.router.navigate(['/']);
    }

    ngOnInit(): void {
        this.alertService.alertEmitter
            .subscribe((response) => {
                this.alert = response;
                setTimeout(() => this.alert = null, 3000);
            });

        this.loginService.enable.subscribe((response) => this.enable = response);
        this.checkLogin();
    }

    onLogout() {
        closeModal('#modalLogoff');
        this.loginService.onLogout().subscribe(response => {
            this.alertService.showAlertDefault(response.toString(), 1);
            this.enable = false;
            this.loginService.logged = false;
            this.router.navigate(['/home']);
        }, () => {
            this.alertService.showAlertDefault('Server error.', 4);
        });
    }

    checkLogin() {
        this.loginService.checkLogin().subscribe(response => {
            this.enable = response == 1 ? true : false;
            this.loginService.logged = response == 1 ? true : false;
        }, () => {
            this.alertService.showAlertDefault('Server error.', 4);
        });
    }

    showModalLogout() {
        showModal('#modalLogoff');
    }
}
