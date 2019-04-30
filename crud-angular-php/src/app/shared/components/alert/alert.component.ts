import { Component, OnInit, Input } from '@angular/core';
import { Alert } from './alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() alert: Alert = null;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.alert = null;
    }, 4000);
  }
}
