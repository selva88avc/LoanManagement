import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '../loan/model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    //constructor(private http: HttpClient) {
    constructor() {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password): Observable<User> {
        let user :User;
        if(username == 'selva' && password == 'kumar'){
            user = new User(1234, 'selva', 'kumar', 'selva', 'kumar', 'iuyiuyu-8809809', 'admin')
            this.currentUserSubject.next(user);
        }
        if(username == 'muthu' && password == 'kumar'){
            user = new User(1234, 'selva', 'kumar', 'selva', 'kumar', 'iuyiuyu-8809809', 'normal')
            this.currentUserSubject.next(user);
        }
        return new Observable((observer) => {
            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user));
                observer.next(user);
            } else {
                observer.error("error");
            }
        });
    }            
        
        // return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         this.currentUserSubject.next(user);
        //         return user;
        //     }));
    

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}