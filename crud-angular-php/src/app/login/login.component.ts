import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from './user';
import { LoginService } from './login.service';
import { TokenService } from '../shared/services/token.service';
import { ValidationService } from '../shared/services/validation.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string = '';

  user: User = new User();

  errors = [];

  enable: boolean = false;

  constructor(
    private alertService: AlertService,
    private validationService: ValidationService,
    private router: Router,
    private tokenService: TokenService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.Token();
  }

  onLogin() {
    this.enable = false;
    this.errors = this.validationService.ValidateUser(this.user);
    if (this.errors.length == 0) {
      this.loginService.onSubmit(this.user, this.token).pipe(take(1)).subscribe(response => {
        if (response == 1) {
          this.loginService.enable.emit(true);
          this.loginService.logged = true;
          this.alertService.showAlertDefault('Successfully logged.', 1);
          this.router.navigate(['/home']);
        } else {
          this.loginService.logged = false;
          this.alertService.showAlertDefault('Invalid login and password.', 4);
          this.Token();
        }
      }, () => {
        this.loginService.logged = false;
        this.alertService.showAlertDefault('Invalid login and password.', 4);
      });
    } else {
      this.Token();
    }
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  private Token() {
    this.tokenService.Token().pipe(take(1)).subscribe((response) => {
      this.token = response.toString();
      this.enable = true;
    }, () => {
    })
  }
}
