import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(private authenticationService: AuthenticationService
    ) {
   
    
  }
  logout() {
    this.authenticationService.logout();
  
  }
  checkAdmin(){
    if(this.authenticationService.currentUserValue)
    this.isAdmin =  this.authenticationService.currentUserValue.role == "admin";
  }
  ngOnInit(): void {
    this.checkAdmin();
  }

}
