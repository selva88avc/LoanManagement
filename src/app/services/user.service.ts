import { Injectable, EventEmitter } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '../loan/model/user';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {
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
    save(user: User): Observable<User> {
        console.log('save user');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<User>(`${environment.userUrl}/users`, user, httpOptions)
            .pipe(map(user => {
                return user;
            }), catchError(val => this.handleError(val)));
    }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.userUrl}/users`)
            .pipe(map(users => {
                return users;
            }), catchError(val => this.handleError(val)));
    }
}