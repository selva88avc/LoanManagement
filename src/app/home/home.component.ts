import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(private authenticationService: AuthenticationService, private loanService: LoanService
  ) {
    authenticationService.isAdmin.subscribe(
      (isAdmin: boolean) => this.isAdmin = isAdmin);
  }
  checkAdmin() {
    if (this.authenticationService.currentUserValue)
      this.isAdmin = this.authenticationService.currentUserValue.role == "admin";
  }
  logout() {
    this.loanService.isLoggedin.emit(true);
    this.authenticationService.logout();
  }

  ngOnInit(): void {
    this.checkAdmin();
  }

}
