import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genderName'
})

export class GenderPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value.toString() == 'M')
            return 'Male'
        else
            return 'Female';
    }
}