import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { LoanService } from '../services/loan.service';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { User } from '../loan/model/user';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { Loan } from '../loan/model/loan';
import { EventEmitter, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthResp } from '../loan/model/auth.resp';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  let route: ActivatedRoute;
  let router: Router;
  let authenticationService: AuthenticationService;
  let loanService: LoanService;
  let alertService: AlertService;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error', 'success']);
  class MockedAuthenticationService {
    private currentUserSubject: BehaviorSubject<AuthResp>;
    public currentUser: Observable<AuthResp>;
    isAdmin= new EventEmitter<boolean>();
    public get currentUserValue(): AuthResp {
        return new AuthResp();
    }
    login(username, password): Observable<AuthResp> {
        return of(new AuthResp())
    }
    logout() {       
    }
}
class MockedLoanService {
  isLogin = new EventEmitter<boolean>();
  saveLoan(loan:Loan) {
    return of({ "loanNumber": 12229634894, "loanAmount": 4324.00, "loanManagementFees": 3434.00, "loanTerm": "Short Term", "originationDate": "2020-07-21T18:30:00.000+00:00", "originationAccount": "21938072382128", "lien": { "name": "Vehicle Lien", "creatTime": "2020-07-24T09:36:40.021+00:00", "resourceType": "House", "resourceValue": 10000.00 }, "borrower": { "firstName": "dsa", "lastName": "dsa", "address": { "addressLine1": "Urapakkam", "addressLine2": "Chennai", "addressLine3": null } }, "status": "DISBURSED" } as unknown as Loan);
  } 
}
  const authenticationServiceStub = {
  login(username, password) {
    return of( new AuthResp() )
    }
  }
  const loanServiceStub = {    
    saveLoan(loan:Loan) {
      return of({ "loanNumber": 12229634894, "loanAmount": 4324.00, "loanManagementFees": 3434.00, "loanTerm": "Short Term", "originationDate": "2020-07-21T18:30:00.000+00:00", "originationAccount": "21938072382128", "lien": { "name": "Vehicle Lien", "creatTime": "2020-07-24T09:36:40.021+00:00", "resourceType": "House", "resourceValue": 10000.00 }, "borrower": { "firstName": "dsa", "lastName": "dsa", "address": { "addressLine1": "Urapakkam", "addressLine2": "Chennai", "addressLine3": null } }, "status": "DISBURSED" } as unknown as Loan);
    }  
  };
  
  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['username'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[FormBuilder, {provide:LoanService, useClass:MockedLoanService}, {provide: AlertService, useValue:alertServiceSpy}, AuthenticationService],      
      imports:[AppRoutingModule, CommonModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    let authService = TestBed.get(AuthenticationService)
    spyOn(authService, 'isAdmin').and.returnValue(new EventEmitter<boolean>());    
    expect(component).toBeTruthy();
  });
  it('created a form with username and password input and login button', () => {
    let authService = TestBed.get(AuthenticationService)
    spyOn(authService, 'isAdmin').and.returnValue(new EventEmitter<boolean>());
    const app = fixture.debugElement.componentInstance;
    const username = fixture.nativeElement.querySelector('username');
    const password = fixture.nativeElement.querySelector('password');
    const button = fixture.nativeElement.querySelector('button');

    expect(username).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
  });
  
});
