import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../model/loan';
import { Lien } from '../model/lien';
import { Address } from '../model/models';
import { AlertService } from '../../services/alert.service';
import { User } from '../model/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-loan-detail',
    templateUrl: './loan-detail.component.html',
    styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
    loanForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    users: User[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loanService: LoanService,
        private userService: UserService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        // this.loanService.isLogin.emit(false); 
        this.loanForm = this.formBuilder.group({
            loanAmount: ['', Validators.required],
            loanTerm: ['', Validators.required],
            loanManagementFees: ['', Validators.required],
            originationDate: ['', Validators.required],
            originationAccount: ['', Validators.required],
            status: ['', Validators.required],
            userId: ['', Validators.required]
        });
        this.loadUsers();
        // get return url from route parameters or default to '/'
        this.returnUrl = '/list';
    }
    loadUsers() {
        this.userService.getUsers()
            .pipe(first())
            .subscribe(
                data => {
                    this.users = data;
                },
                error => {
                    console.error("not authenticated");
                    this.alertService.error(error);
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
        const loan = new Loan(null, this.f.loanAmount.value, this.f.loanManagementFees.value, this.f.loanTerm.value, new Date(this.f.originationDate.value), '21938072382128', new Lien('Vehicle Lien', new Date(), 'House', 10000), new User(this.f.userId.value, null, null, null, null, null, null, null), this.f.status.value);
        this.loanService.saveLoan(loan)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success("Loan [" + data.loanNumber + "] has been successfully created", true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.error("not authenticated");
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
