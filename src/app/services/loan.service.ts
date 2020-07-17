import { Injectable, EventEmitter } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '../loan/model/user';
import { Loan } from '../loan/model/loan';
import { v4 as uuidv4 } from 'uuid';
import { Person } from '../loan/model/person';
import { Address, Lien } from '../loan/model/models';
import { PersistentService } from './persistent.service';

@Injectable({ providedIn: 'root' })
export class LoanService {
    

    //constructor(private http: HttpClient) {
    constructor(private persistentService: PersistentService) {
    }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }
    loanToBeEdited = new EventEmitter<string>();
    isUpdated = new EventEmitter<boolean>();
    saveLoan(loanAmount, loanTerm, loanManagementFees, originationDate, originationAccount, status, firstName, lastName): Observable<Loan> {
        console.log("9999999999999999");
        console.log(originationDate);
        //let loanNumber = uuidv4();
        let loanNumber = "2"+this.getRandomNumber();
        console.log(loanNumber);
        let loan :Loan;
        loan = new Loan(loanNumber, loanAmount, loanManagementFees, loanTerm, new Date(originationDate), '21938072382128',new Lien('Vehicle Lien', new Date(), 'House', 10000),new Person('1234', firstName, lastName, new Address('Urapakkam', 'Chennai')), status )
        this.persistentService.save(loan);
        return new Observable((observer) => {
            if(loan){
                observer.next(loan);
            } else {
                observer.error("error");
            }
        });
    } 
    updateLoan(loanNumber, loanAmount, loanTerm, loanManagementFees, originationDate, originationAccount, status, firstName, lastName): Observable<Loan> {
        console.log(loanNumber);
        let loan :Loan;
        loan = new Loan(loanNumber, loanAmount, loanManagementFees, loanTerm, new Date(originationDate), '21938072382128',new Lien('Vehicle Lien', new Date(), 'House', 10000),new Person('1234', firstName, lastName, new Address('Urapakkam', 'Chennai')), status )
        this.persistentService.update(loan);
        return new Observable((observer) => {
            if(loan){
                observer.next(loan);
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
    
    getRandomNumber(){
        return Math.floor(Math.random()*(9999999999-1000000000+1)+1000000000);
    }
    remove() {
        //GlobalConstant.loans.r
        // remove user from local storage and set current user to null
        //localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }
}