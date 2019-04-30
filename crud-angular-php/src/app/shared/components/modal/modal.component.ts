import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Modal } from './modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  @Input() modal: Modal;

  @Output() modalEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(opt: number) {
    this.modalEvent.emit(opt);
  }
}
