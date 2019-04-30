import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Person } from './person';
import { PersonService } from './person.service';
import { TokenService } from '../shared/services/token.service';
import { AlertService } from '../shared/services/alert.service';

declare const setPagination: any;

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person = new Person();

  token: string = "";

  people: object = [];

  enable: boolean = false;

  status: boolean = false;

  search: string = '';

  p: number = 1;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private personService: PersonService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.enable = false;
    this.person.name = '';
    this.status = true;
    this.Token();
  }

  private Token() {
    this.tokenService.Token().pipe(take(1)).subscribe((response) => {
      this.token = response.toString();
      if (this.status) {
        this.onList();
      }
    }, () => {
    });
  }

  onSubmitList() {
    this.enable = false;
    this.status = true;
    this.person.name = this.search;
    this.onList();
  }

  private onList() {
    this.enable = false;
    this.personService.onExecution(this.person, this.token, 4).pipe(take(1))
      .subscribe(response => {
        this.people = response;
        this.status = false;
        this.enable = true;
        this.Token();
      }, () => {
        this.alertService.showAlertDefault('Error listing.', 4);
        this.enable = true;
      });
  }

  redirectCreate() {
    this.router.navigate(['person', 'new']);
  }
}