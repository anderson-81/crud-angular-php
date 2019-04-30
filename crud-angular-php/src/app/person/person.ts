export class Person {
    id: number;
    name: string;
    email: string;
    salary: string;
    birthday: string;
    gender: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.email = '';
        this.salary = '0.00';
        this.birthday = '';
        this.gender = 'M';
    }

    public setPerson(person) {
        this.id = person.CODIGO;
        this.name = person.NOME;
        this.email = person.EMAIL;
        this.salary = person.RENDA;
        this.birthday = person.DATANASC;
        this.gender = person.SEXO;
    }
}