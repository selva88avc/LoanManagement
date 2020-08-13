import { Injectable, EventEmitter } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '../loan/model/user';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AuthResp } from '../loan/model/auth.resp';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AuthResp>;
    public currentUser: Observable<AuthResp>;
    isAdmin = new EventEmitter<boolean>();
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AuthResp>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AuthResp {
        return this.currentUserSubject.value;
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Message: ${error.error.reason}`;
        }
        return throwError(errorMessage);
    }

    login(username, password): Observable<AuthResp> {
        const req = {username: username, password: password}
        return this.http.post<AuthResp>(`${environment.userUrl}/authenticate`,req)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }), catchError(val => this.handleError(val)));

    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}