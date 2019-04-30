import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-errors-summary',
  templateUrl: './errors-summary.component.html',
  styleUrls: ['./errors-summary.component.css']
})
export class ErrorsSummaryComponent implements OnInit {

  @Input() errors = [];

  constructor() { }

  ngOnInit() {
  }
}
