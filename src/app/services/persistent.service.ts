// import { Injectable } from '@angular/core';
// //import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// //import { map } from 'rxjs/operators';
// import { User } from '../loan/model/user';
// import { Loan } from '../loan/model/loan';

// @Injectable({ providedIn: 'root' })
// export class PersistentService {
//     private loanSubject: BehaviorSubject<Loan[]>;
//     public loans: Observable<Loan[]>;

//     //constructor(private http: HttpClient) {
//     constructor() {
//         this.loanSubject = new BehaviorSubject<Loan[]>(JSON.parse(localStorage.getItem('loanItems')));
//         this.loans = this.loanSubject.asObservable();
//     }

//     public get loanValues(): Loan[] {
//         this.loanSubject = new BehaviorSubject<Loan[]>(JSON.parse(localStorage.getItem('loanItems')));
//         this.loans = this.loanSubject.asObservable();
//         return this.loanSubject.value;
//     }

//     public save(loan: Loan): Observable<boolean> {
//         let loanList = this.loanSubject?.value;
//         if (!loanList) {
//             loanList = [];
//         }
//         loanList.push(loan);
//         localStorage.setItem('loanItems', JSON.stringify(loanList));
//         return new Observable((observer) => {
//             if (loan) {
//                 observer.next(true);
//             } else {
//                 observer.error("error");
//             }
//         });
//     }
//     public update(loan: Loan): Observable<boolean> {
//         let loanList = this.loanSubject?.value;
//         console.log(loanList);
//         loanList = loanList.filter((a) => { console.log(a.loanNumber + "--" + loan.loanNumber + (a.loanNumber != loan.loanNumber)); return a.loanNumber != loan.loanNumber });
//         console.log(loanList);
//         //loanList.filterreduce((previousValue: Loan, currentValue: Loan, currentIndex: number, array: Loan[])=> (currentValue.loanNumber != loan.loanNumber && array.push(currentValue), array),[]);      
//         loanList.push(loan);
//         localStorage.setItem('loanItems', JSON.stringify(loanList));
//         return new Observable((observer) => {
//             if (loan) {
//                 observer.next(true);
//             } else {
//                 observer.error("error");
//             }
//         });
//     }

//     // return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
//     //     .pipe(map(user => {
//     //         // store user details and jwt token in local storage to keep user logged in between page refreshes
//     //         localStorage.setItem('currentUser', JSON.stringify(user));
//     //         this.currentUserSubject.next(user);
//     //         return user;
//     //     }));



// }