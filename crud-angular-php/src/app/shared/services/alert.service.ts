import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from '../components/alert/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertEmitter = new EventEmitter<Alert>();

  private alert: Alert = new Alert();

  constructor() { }

  message: string;

  setAlert(opt, result: number) {
    if (opt == 1) {
      this.showAlert(result == 1 ? 'Successfully created.' : 'Error creating.', result == 1 ? 1 : 4);
    }

    if (opt == 2) {
      this.showAlert(result == 1 ? 'Successfully edited.' : 'Error editing.', result == 1 ? 1 : 4);
    }

    if (opt == 3) {
      this.showAlert(result == 1 ? 'Successfully deleted.' : 'Error deleting.', result == 1 ? 1 : 4);
    }

    if (opt == 4) {
      this.showAlert(result == 1 ? 'Successfully deleted.' : 'Error deleting.', result == 1 ? 1 : 4);
    }
  }

  showAlertDefault(message: string, type: number) {
    this.alert.message = message;
    this.createAlert(type);
    this.alertEmitter.emit(this.alert);
  }

  private showAlert(message: string, type: number) {
    this.alert.message = message;
    this.createAlert(type);
    this.alertEmitter.emit(this.alert);
  }

  private createAlert(type: number) {
    switch (type) {
      case 2: {
        this.alert.title = "Info!";
        this.alert.classes = "alert alert-info alert-dismissible";
        break;
      }
      case 3: {
        this.alert.title = "Warning!";
        this.alert.classes = "alert alert-warning alert-dismissible";
        break;
      }
      case 4: {
        this.alert.title = "Error!";
        this.alert.classes = "alert alert-danger alert-dismissible";
        break;
      }
      default: {
        this.alert.title = "Success!";
        this.alert.classes = "alert alert-success alert-dismissible";
        break;
      }
    }
  }
}
