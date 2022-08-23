import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { User, UserService } from './services/user.service';

/**
 * Main component for the application
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    users$?: Observable<User[]>;
    usersWithUpdates$?: Observable<User[]>;
    refreshUsers$ = new BehaviorSubject<User | null>(null);
    userToAdd: User = { name: { first: '', last: '' } };

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.users$ = this.fetchUserData();

        this.setUserWithUpdates();
    }

    setUserWithUpdates(): void {

        this.usersWithUpdates$ = this.fetchUserData();
    }


    fetchUserData(): Observable<User[]> {
        return this.userService.getUsers().pipe(
            delay(1000), // simulate waiting for data response
            tap(console.log)
        );
    }


    addUserWithBehaviorSubject() {
        this.userService.addUser(this.userToAdd).pipe(
            map(() => {
                this.userToAdd = { name: { first: '', last: '' } };
                this.refreshUsers$.next(this.userToAdd);
            })
        ).subscribe();
    }


    addUserWithReassignment() {
        this.userService.addUser(this.userToAdd).pipe(
            map(() => {
                this.setUserWithUpdates();
            })
        ).subscribe();
    }
}
