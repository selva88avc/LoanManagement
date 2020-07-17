import { Component, OnInit } from '@angular/core';
import { Loan } from '../model/loan';
import { Lien } from '../model/lien';
import { Person } from '../model/person';
import { Address } from '../model/models';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LoanService } from '../../services/loan.service';
import { PersistentService } from '../../services/persistent.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  loans: Loan[];
  //loan: Loan;
  isListOnly = true;
  constructor(private loanService: LoanService, private persistentService: PersistentService, private authenticationService: AuthenticationService ) {
    this.loans = persistentService.loanValues;
    loanService.isUpdated.subscribe(
      (status: boolean) => {if(status){this.loans = persistentService.loanValues;this.dataSource = new MatTableDataSource<Loan>(persistentService.loanValues);this.isListOnly = true;}} 
  )
  }
  dataSource: MatTableDataSource<Loan>;

  checkAdmin(){
    if(this.authenticationService.currentUserValue)
    this.isAdmin =  this.authenticationService.currentUserValue.role == "admin";
  }
  
  
  edit(loanNumber: string){
    this.isListOnly = false;
    this.loanService.loanToBeEdited.emit(loanNumber);
    //this.loan = this.getLoan(loanNumber);
  }

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.checkAdmin();
    console.log("yes");
    this.dataSource = new MatTableDataSource<Loan>(this.persistentService.loanValues);
    this.dataSource.filterPredicate = (data: Loan, filter: string) => {
      console.log(data.borrower.firstName+"=="+data.borrower.lastName+"--"+filter);
      console.log((data.loanNumber.includes(filter)||data.borrower.firstName.includes(filter)||data.borrower.lastName.includes(filter)));
      return (data.loanNumber.includes(filter)||data.borrower.firstName.toLowerCase().includes(filter)||data.borrower.lastName.toLowerCase().includes(filter));
     };
    }

}
