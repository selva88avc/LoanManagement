import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  
  subscripeLogin() {
    this.loanService.isLogin.subscribe(
      (isLogin: boolean) => this.isLogin = isLogin);
  }
  isLogin: boolean = false;
  constructor(private loanService: LoanService) {
    this.subscripeLogin();    
  }

  ngOnInit(): void {
  }

}
;