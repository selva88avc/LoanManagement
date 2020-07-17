import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { Loan } from '../../model/loan';
import { LoanService } from '../../../services/loan.service';
import { PersistentService } from '../../../services/persistent.service';


@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrls: ['./loan-item.component.css']
})
export class LoanItemComponent implements OnInit {
  loanForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loans: Loan[];
  loan: Loan;
  getLoanForm(loanNumber) { 
    this.loan =  this.loans.filter(loan => loan.loanNumber== loanNumber)[0];     
    return this.formBuilder.group({
        loanNumber: [{value : this.loan.loanNumber,disabled: true},Validators.required],
        loanAmount: [this.loan.loanAmount, Validators.required],
        loanTerm: [this.loan.loanTerm, Validators.required],
        loanManagementFees: [this.loan.loanManagementFees, Validators.required],
        originationDate: [this.loan.originationDate, Validators.required],
        originationAccount: [this.loan.originationAccount, Validators.required],
        status: [this.loan.status, Validators.required],
        firstName: [this.loan.borrower.firstName, Validators.required],
        lastName: [this.loan.borrower.lastName, Validators.required]
    }) 
  } 
 
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private loanService: LoanService
      , private persistentService: PersistentService ) {
        this.loans = persistentService.loanValues;
   loanService.loanToBeEdited.subscribe(
       (loanNumber: string) => { this.loans = persistentService.loanValues;this.loanForm = this.getLoanForm(loanNumber)}  
   )
  }
  ngOnInit() {
    this.loanForm = this.formBuilder.group({
        loanNumber: ['', Validators.required],
        loanAmount: ['', Validators.required],
        loanTerm: ['', Validators.required],
        loanManagementFees: ['', Validators.required],
        originationDate: ['', Validators.required],
        originationAccount: ['', Validators.required],
        status: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/list';
}

// convenience getter for easy access to form fields
get f() { return this.loanForm.controls; }

onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loanForm.invalid) {
        return;
    }

    this.loading = true;
    this.loanService.updateLoan(this.f.loanNumber.value,this.f.loanAmount.value, this.f.loanTerm.value, this.f.loanManagementFees.value, this.f.originationDate.value,this.f.originationAccount.value, this.f.status.value, this.f.firstName.value, this.f.lastName.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.error("not authenticated");
                //this.alertService.error(error);
                //this.loading = false;
            });
            this.loanService.isUpdated.emit(true);        
}

}
