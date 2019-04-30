import { Injectable, EventEmitter } from '@angular/core';

declare const showModal: any;

@Injectable()
export class ModalService {

    /*
    private modal: Modal = new Modal();

    modalService = new EventEmitter();

    constructor() { }

    showModal(type: number) {
        this.modal.title = "Question";
        switch (type) {
            case 1: {
                this.modal.question = 'Do you want edit this record?';
                this.modal.style = 'btn btn-warning col-md-2';
                this.modal.opt = 2;
                break;
            }
            case 2: {
                this.modal.question = 'Do you want delete this record?';
                this.modal.style = 'btn btn-danger col-md-2';
                this.modal.opt = 3;
                break;
            }
            case 3: {
                this.modal.question = 'Do you want logoff?';
                this.modal.style = 'btn btn-danger';
                this.modal.opt = 3;
                break;
            }
        }
        this.modalService.emit(this.modal);
    }
    */
}
