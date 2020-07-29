import { Component, OnInit } from '@angular/core';
import { Loan } from '../model/loan';
import { Lien } from '../model/lien';
import { Address } from '../model/models';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LoanService } from '../../services/loan.service';
// import { PersistentService } from '../../services/persistent.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  loans: Loan[];
  isListOnly = true;
  isAdmin: boolean;
  dataSource: MatTableDataSource<Loan>;
  filterFirstName: string;
  filterLastName: string;
  filterLoanNumber: string;
  constructor(private loanService: LoanService,
    private alertService: AlertService, private authenticationService: AuthenticationService) {
    this.loanService.isLogin.emit(false);
    loanService.isAdmin.subscribe(
       (isAdmin: boolean) => this.isAdmin = isAdmin)
    loanService.isUpdated.subscribe(
      (status: boolean) => { if (status) { this.alertService.success("Successfully Updated"); this.loadLoans(); this.isListOnly = true; } }
    )
  }

  checkAdmin() {
    if (this.authenticationService.currentUserValue)
      this.isAdmin = this.authenticationService.currentUserValue.role === "admin";
  }

  edit(loanNumber: string) {
    this.isListOnly = false;
    this.alertService.clear();
    this.emitLoan(loanNumber);
  }
  emitLoan(loanNumber: any) {
    this.loanService.loanToBeEdited.emit(this.loans.filter(loan => loan.loanNumber=== loanNumber)[0]);
  }
  loadLoans(){
    this.loanService.getLoans()
            .pipe(first())
            .subscribe(
                data => {
                    if(!this.isAdmin){
                      const userId = this.authenticationService.currentUserValue.userId;
                      this.loans = data.filter((loan)=>loan.borrower.userId === userId);
                    } else {
                      this.loans = data;
                    }                    
                    this.clearFilter();
                },
                error => {
                    console.error("not authenticated");
                    this.alertService.error(error);
                });
  }

  clearFilter(){
    this.filterFirstName = undefined;
    this.filterLastName = undefined;
    this.filterLoanNumber = undefined;
    this.dataSource = new MatTableDataSource<Loan>(this.loans);
  }

  applyFilter() {
    this.alertService.clear();
    this.dataSource = new MatTableDataSource<Loan>(this.loans.filter(loan => (
      (this.filterLoanNumber ? loan.loanNumber.toString().includes(this.filterLoanNumber) : true) &&
      (this.filterFirstName ? loan.borrower.firstName.toLowerCase().includes(this.filterFirstName) : true) &&
      (this.filterLastName ? loan.borrower.lastName.toLowerCase().includes(this.filterLastName) : true)
    )));   
  }

  ngOnInit() {
    this.checkAdmin();
    this.loadLoans();    
    this.clearFilter();
  }
}