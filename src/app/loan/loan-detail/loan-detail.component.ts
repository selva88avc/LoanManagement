import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../model/loan';
import { Lien } from '../model/lien';
import { Person } from '../model/person';
import { Address } from '../model/models';


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

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private loanService: LoanService
  ) {
    console.log("------------------------");
    // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.loanForm = this.formBuilder.group({
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
      this.loanService.saveLoan(this.f.loanAmount.value, this.f.loanTerm.value, this.f.loanManagementFees.value, this.f.originationDate.value,this.f.originationAccount.value, this.f.status.value, this.f.firstName.value, this.f.lastName.value)
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
  }

}
