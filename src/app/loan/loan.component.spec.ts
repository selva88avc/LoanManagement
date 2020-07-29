import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanComponent } from './loan.component';
import { LoanService } from '../services/loan.service';
import { EventEmitter } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoanComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>;
  let loanService: LoanService;
    
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ LoanComponent ],
      providers: [{provide: LoanService}]
      //,
      //providers: [{provide: LoanService, useValue: {isLogin= new EventEmitter<boolean>();}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    loanService = TestBed.get(LoanService);
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('subscription should get called on value change', () => {
    loanService.isLogin.emit(true);
    expect(component.isLogin).toEqual(true);
  });
});
