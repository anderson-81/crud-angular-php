import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { Person } from '../person';
import { PersonService } from '../person.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  visible: boolean = false;

  token: string;

  person = new Person();

  constructor(
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.visible = false;
    this.Token();
  }

  private onGetById() {
    this.activatedRoute.params.pipe(take(1))
      .subscribe((params: any) => {
        this.person.id = parseInt(params['id']);
        this.personService.onExecution(this.person, this.token, 5).pipe(take(1))
          .subscribe((response) => {
            if (!(response == '')) {
              this.person.setPerson(response[0]);
              this.visible = true;
            } else {
              this.router.navigate(['404']);
            }
          }, () => {
            this.alertService.showAlertDefault('Error detailing.', 4);
          });
      }, () => {
        this.alertService.showAlertDefault('Error detailing.', 4);
      });
  }

  private Token() {
    this.tokenService.Token().pipe(take(1)).subscribe((response) => {
      this.token = response.toString();
      this.onGetById();
    }, () => {
    })
  }
}