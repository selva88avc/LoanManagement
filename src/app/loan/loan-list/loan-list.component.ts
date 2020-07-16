import { Component, OnInit } from '@angular/core';
import { Loan } from '../model/loan';
import { Lien } from '../model/lien';
import { Person } from '../model/person';
import { Address } from '../model/models';
import { GlobalConstant } from '../../common/global.constant';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = GlobalConstant.loans;
  loan: Loan;
  isListOnly = true;
  constructor( ) {
  }
  dataSource: MatTableDataSource<Loan>;

  getLoan(loanNumber) { 
    return (this.loans.filter(loan => loan.loanNumber== loanNumber))[0]; 
  } 
  
  edit(loanNumber: string){
    this.isListOnly = false;
    this.loan = this.getLoan(loanNumber);
  }

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Loan>(this.loans);
    this.dataSource.filterPredicate = (data: Loan, filter: string) => {
      return data.loanNumber.includes(filter)||data.borrower.firstName.includes(filter)||data.borrower.lastName.includes(filter)
     };
    }

}
