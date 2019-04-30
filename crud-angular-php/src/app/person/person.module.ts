import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person.routing.module';
import { PersonComponent } from './person.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonService } from './person.service';
import { GenderPipe } from '../shared/pipes/gender.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../shared/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PersonDeactivateGuard } from '../guards/person-deactivate.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        PersonRoutingModule,
        ComponentsModule,
        NgxPaginationModule
    ],
    declarations: [
        PersonComponent,
        PersonDetailsComponent,
        PersonFormComponent,
        GenderPipe
    ],
    exports: [PersonComponent],
    providers: [
        PersonService,
        PersonDeactivateGuard
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class PersonModule { }