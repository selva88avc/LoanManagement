import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { Loan } from '../../model/loan';
import { LoanService } from '../../../services/loan.service';
// import { PersistentService } from '../../../services/persistent.service';
import { AlertService } from '../../../services/alert.service';
import { Address, Lien } from '../../model/models';
import { User } from '../../model/user';


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
    loan: Loan;
    getLoanForm(loan) {
        this.loan = loan;
        return this.formBuilder.group({
            loanNumber: new FormControl({ value: this.loan.loanNumber, disabled: true }, Validators.required),
            email: new FormControl({ value: this.loan.borrower.email, disabled: true }, Validators.required),
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
        private loanService: LoanService,
        private alertService: AlertService) {
         loanService.loanToBeEdited.subscribe(
            (loan: Loan) => { this.loanForm = this.getLoanForm(loan) }
        )
    }
    ngOnInit() {
        this.loanForm = this.formBuilder.group({
            loanNumber: [{ value: '', disabled: true }, Validators.required],
            loanAmount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            loanTerm: ['', Validators.required],
            loanManagementFees: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            originationDate: ['', Validators.required],
            originationAccount: ['', Validators.required],
            status: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: [{ value: '', disabled: true }, Validators.required]
        });
        
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
        const loan = new Loan(this.loan.loanNumber, this.f.loanAmount.value, this.f.loanManagementFees.value, this.f.loanTerm.value, new Date(this.f.originationDate.value), '21938072382128', new Lien('Vehicle Lien', new Date(), 'House', 10000), this.loan.borrower.userId, this.f.status.value);
        console.log("loan"+loan.userId);
        this.loanService.saveLoan(loan)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success("Loan [" + data.loanNumber + "] has been successfully updated", true);
                    this.loanService.isUpdated.emit(true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        
    }
}