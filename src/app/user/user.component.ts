import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../services/loan.service';
import { AlertService } from '../services/alert.service';
import { Loan } from '../loan/model/loan';
import { Lien } from '../loan/model/lien';
import { Address } from '../loan/model/models';
import { first } from 'rxjs/operators';
import { User } from '../loan/model/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    userForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
    }

    ngOnInit(): void {
        // this.loanService.isLogin.emit(false);
        this.userForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address1: ['', Validators.required],
            address2: ['', Validators.required],
            address3: ['', Validators.required],
            role: ['', Validators.required],
            email: ['', Validators.required],
            userName: ['', Validators.required],
            passWord: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = '/loan';
    }

    // convenience getter for easy access to form fields
    get f(): { [key: string]: AbstractControl; } { return this.userForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        // stop here if form is invalid
        // if (this.userForm.invalid) {
        //     return;
        // }
        this.loading = true;
        const address = new Address(this.f.address1.value, this.f.address2.value, this.f.address3.value);
        const userName = this.f.userName.value;
        const passWord = this.f.passWord.value;
        const firstName = this.f.firstName.value;
        const lastName = this.f.lastName.value;
        const role = this.f.role.value;
        const email = this.f.email.value;
        const user = new User(null, userName, passWord, firstName, lastName, role, email, address);
        this.userService.save(user)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('User [' + data.email + '] has been successfully created', true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.error('not authenticated');
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}