import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css']
})
export class PageErrorComponent implements OnInit {

  code: number = 404;
  message: string = "Page not found.";

  constructor() { }

  ngOnInit() {
  }
}
