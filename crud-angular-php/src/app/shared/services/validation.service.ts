import { Injectable } from '@angular/core';
import { Person } from 'src/app/person/person';
import { User } from 'src/app/login/user';

@Injectable()
export class ValidationService {

    constructor() { }

    ValidateUser(user: User) {

        let errors = [];

        let _temp: string = '';

        _temp = this.checkEmpty(user.login, 'Login');
        if (_temp) {
            errors.push(_temp);
        }

        _temp = this.checkEmpty(user.password, 'Password');
        if (_temp) {
            errors.push(_temp);
        }

        return errors;
    }

    ValidatePerson(person: Person) {

        let errors = [];

        let _temp: string = '';

        _temp = this.checkEmpty(person.name, 'Name');
        if (_temp) {
            errors.push(_temp);
        } else {
            _temp = this.checkMinMaxString(person.name, 'Name', 3, 100);
            if (_temp) {
                errors.push(_temp);
            }
        }

        _temp = '';

        _temp = this.checkEmpty(person.email, 'E-mail');
        if (_temp) {
            errors.push(_temp);
        } else {
            _temp = this.checkMinMaxString(person.email, 'E-mail', 7, 100);
            if (_temp) {
                errors.push(_temp);
            } else {
                _temp = this.validateEmail(person.email);
                if (_temp) {
                    errors.push(_temp);
                }
            }
        }

        _temp = '';

        _temp = this.checkEmpty(person.salary, 'Salary');
        if (_temp) {
            errors.push(_temp);
        } else {
            _temp = this.checkRangeNumber(parseFloat(person.salary), 'Salary', 0, 999999999999.99);
            if (_temp) {
                errors.push(_temp);
            }
        }

        _temp = '';

        _temp = this.checkEmpty(person.birthday, 'Birthday');
        if (_temp) {
            errors.push(_temp);
        } else {
            _temp = this.validateDate(person.birthday, 'Birthday');
            if (_temp) {
                errors.push(_temp);
            } else {
                _temp = this.validateDateByAge(person.birthday, 18);
                if (_temp) {
                    errors.push(_temp);
                }
            }
        }

        _temp = '';

        _temp = this.checkEmpty(person.gender, 'Gender');
        if (_temp) {
            errors.push(_temp);
        } else {
            _temp = this.validateGender(person.gender);
            if (_temp) {
                errors.push(_temp);
            }
        }

        return errors;
    }

    /*****************************************************************/

    private checkEmpty(attribute: string, attribute_name: string) {
        if (!attribute) {
            return (`${attribute_name} is empty.`);
        }
    }

    private checkMinMaxString(attribute: string, attribute_name: string, min: number, max: number) {
        if ((attribute.length < min) || (attribute.length > max)) {
            return (`${attribute_name} has invalid character quantity. Minimum of ${min} and maximum of ${max}.`);
        }
    }

    private checkRangeNumber(attribute: number, attribute_name: string, min: number, max: number) {
        if ((attribute < min) || (attribute > max)) {
            return (`${attribute_name} is outside the valid range of value.`);
        }
    }

    private validateDate(date: string, attribute_name: string) {
        var dateFormat = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
        if (!date.match(dateFormat)) {
            return (`Invalid ${attribute_name}.`);
        }
    }

    private validateDateByAge(date: string, age: number) {

        let dateNow = new Date();

        let _date: Date = new Date(date);
        let _date18: Date = new Date(dateNow.getDate() + '/' + dateNow.getMonth() + '/' + dateNow.getFullYear());
        _date18.setFullYear(dateNow.getFullYear() - age);

        if (_date > _date18) {
            return (`Minimum age of ${age} years to register.`);
        }
    }

    private validateEmail(email: string) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailformat)) {
            return ('Invalid E-mail.');
        }
    }

    private validateGender(gender: string) {
        if ((gender != 'M') && (gender != 'F')) {
            return ('Invalid gender');
        }
    }
}