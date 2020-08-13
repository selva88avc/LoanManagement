import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { map } from 'rxjs/operators';
import { User } from '../loan/model/user';
import { Loan } from '../loan/model/loan';
import { v4 as uuidv4 } from 'uuid';
import { Address, Lien } from '../loan/model/models';
// import { PersistentService } from './persistent.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class LoanService {
    loanToBeEdited = new EventEmitter<Loan>();
    isUpdated = new EventEmitter<boolean>();
    isLogin = new EventEmitter<boolean>();
    isLoggedin = new EventEmitter<boolean>();
    isAdmin = new EventEmitter<boolean>();
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

    }

    handleError(error: any): Observable<never> {
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

    saveLoan(loan: Loan): Observable<Loan> {
        if (!loan.loanNumber) {
            loan.loanNumber = this.getRandomNumber();
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Loan>(`${environment.loanUrl}/loans`, loan, httpOptions)
            .pipe(map(loan => {
                return loan;
            }), catchError(val => this.handleError(val)));
    }

    getLoans(): Observable<Loan[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'User-Authorization': this.authenticationService.currentUserValue.jwttoken
            })
        };
        return this.http.get<Loan[]>(`${environment.loanUrl}/loans`, httpOptions)
            .pipe(map(loans => {
                return loans;
            }), catchError(val => this.handleError(val)));
    }

    getRandomNumber(): number {
        return Math.floor(Math.random() * (99999999999 - 10000000000 + 1) + 10000000000);
    }
    // remove() {
    // GlobalConstant.loans.r
    // remove user from local storage and set current user to null
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
    // }
}