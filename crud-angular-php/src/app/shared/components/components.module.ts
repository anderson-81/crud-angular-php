import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { ErrorsSummaryComponent } from './errors-summary/errors-summary.component';
import { ModalComponent } from './modal/modal.component';
import { TitleComponent } from './title/title.component';

import { CommonModule } from '@angular/common';
import { ValidationService } from '../services/validation.service';

@NgModule({
    declarations: [
        AlertComponent,
        ErrorsSummaryComponent,
        ModalComponent,
        TitleComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        ErrorsSummaryComponent,
        ModalComponent,
        TitleComponent
    ],
    providers: [
        ValidationService
    ]
})
export class ComponentsModule { }
