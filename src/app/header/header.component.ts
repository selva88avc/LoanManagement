
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoanService } from '../services/loan.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public username: string;
  subscribeLogin() {
    this.loanService.isLoggedin.subscribe(
      (isLoggedin: boolean) => { if (isLoggedin === true) { this.username = this.authenticationService.currentUserValue.firstName + " " + this.authenticationService.currentUserValue.lastName } else if(isLoggedin === false){
        this.username = null;
      } });
  }
  constructor(private authenticationService: AuthenticationService, private loanService: LoanService) {
    this.subscribeLogin();
    if(this.authenticationService.currentUserValue){
      this.username = this.authenticationService.currentUserValue.firstName + " " + this.authenticationService.currentUserValue.lastName
    }
  }

  ngOnInit(): void {
  }
}