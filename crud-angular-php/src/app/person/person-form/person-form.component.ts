import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { Person } from '../person';
import { Modal } from 'src/app/shared/components/modal/modal';

import { TokenService } from 'src/app/shared/services/token.service';
import { PersonService } from '../person.service';

import * as $ from 'jquery';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AlertService } from 'src/app/shared/services/alert.service';
declare const setMask: any;
declare const showModal: any;
declare const closeModal: any;

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  person: Person = new Person();

  edition: boolean = null;

  errors = [];

  enable: boolean = false;

  token: string = '';

  modal = new Modal();

  changed: boolean = false;

  eventclick = new EventEmitter<boolean>();

  constructor(
    private alertService: AlertService,
    private validationService: ValidationService,
    private router: Router,
    private tokenService: TokenService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.setDate();
    setMask();
    this.Token();
  }

  onClick(opt) {

    this.errors = [];

    if (opt == 1) {
      this.enable = false;
      this.setDataMasked();
      this.errors = this.validationService.ValidatePerson(this.person);
      this.setExecution(1);
    }

    if (opt == 2) {
      this.enable = false;
      this.setDataMasked();
      closeModal('#modalQuestion');
      this.errors = this.validationService.ValidatePerson(this.person);
      this.setExecution(2);
    }

    if (opt == 3) {
      this.enable = false;
      closeModal('#modalQuestion');
      this.setExecution(3);
    }

    if (opt == 4) {
      closeModal('#modalQuestion');
      this.eventclick.emit(true);
    }
  }

  showModal(type: number) {
    this.modal.title = "Question";
    switch (type) {
      case 1: {
        this.modal.question = 'Do you want edit this record?';
        this.modal.style = 'btn btn-danger col-md-2';
        this.modal.opt = 2;
        break;
      }
      case 2: {
        this.modal.question = 'Do you want delete this record?';
        this.modal.style = 'btn btn-primary col-md-2';
        this.modal.opt = 3;
        break;
      }
      case 3: {
        this.modal.question = 'Do you want out and lose all forms data?';
        this.modal.style = 'btn btn-primary col-md-2';
        this.modal.opt = 4;
        break;
      }
    }
    showModal('#modalQuestion');
  }

  redirectToList() {
    this.router.navigate(['/person'])
  }

  onInput() {
    this.changed = true;
  }

  isChange() {
    if (this.changed == true) {
      this.showModal(3);
      return this.eventclick.pipe(tap(response => response, error => error));
    } else {
      return true;
    }
  }

  private onGetById() {
    this.enable = false;
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe((params: any) => {
        this.person.id = parseInt(params['id']);
        this.personService.onExecution(this.person, this.token, 5)
          .pipe(take(1))
          .subscribe(response => {
            if (!(response == '')) {
              this.person.setPerson(response[0]);
              this.edition = true;
              this.enable = true;
            } else {
              this.router.navigate(['404']);
            }
          }, () => {
          });
      }, () => {
        this.alertService.showAlertDefault('Error fetching person for editing.', 4);
      });
  }

  private Token() {
    this.enable = false;
    this.tokenService.Token()
      .pipe(take(1))
      .subscribe((response) => {
        this.token = response.toString();
        if (this.router.url.includes('edit')) {
          this.onGetById();
        } else {
          this.edition = false;
          this.enable = true;
        }
      }, () => {
      });
  }

  private setExecution(opt) {
    if (this.errors.length == 0) {
      this.onExecution(opt);
    } else {
      this.Token();
    }
  }

  private onExecution(opt) {
    this.changed = false;
    this.setDataMasked();
    this.personService.onExecution(this.person, this.token, opt)
      .pipe(take(1))
      .subscribe(response => {
        let result = parseInt(response.toString());
        if (result == 1) {
          this.router.navigate(['/person'])
        }
        this.alertService.setAlert(opt, result);
        this.enable = true;
      }, () => {
        this.alertService.setAlert(opt, -1);
      });
  }

  private setDate() {
    var temp = $("#birthday").val();
    $("#birthday").val(temp);
  }

  private setDataMasked() {
    this.person.salary = $("#salary").val().toString();
    this.person.birthday = $("#birthday").val().toString();
  }
}
