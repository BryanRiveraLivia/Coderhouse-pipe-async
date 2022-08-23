import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
    name: {
        first: string;
        last: string;
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [{
        name: {
            first: 'Fernando',
            last: 'Olvera'
        }
    }, {
        name: {
            first: 'Mariano',
            last: 'Alvez'
        }
    }];

    getUsers(): Observable<User[]> {
        return of(this.users);
    }

    addUser(user: User): Observable<string> {
        this.users = [...this.users, user];
        return of('Usuario agregado con éxito - saludos de Perú!');
    }

}
