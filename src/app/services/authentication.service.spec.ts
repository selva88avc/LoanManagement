//import {describe,expect,it} from 'angular2/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { AlertService } from "./alert.service";
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


describe('AuthenticationService', () => {
    let authenticationService: AuthenticationService;
    let http: HttpClient;
    let routerEventSpy: jasmine.Spy;
    let methodSpy = jasmine.createSpyObj;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers:[AuthenticationService, HttpClient],      
            imports:[ HttpClientModule]
          })
          .compileComponents();
        http = TestBed.get(HttpClient);
        authenticationService = TestBed.get(AuthenticationService);
        methodSpy = spyOn(authenticationService, 'clear');
    });

    afterEach(() => {
        alertService = null;
    });

    it('should clear alert message', async (done) => {
        alertService.setKeepAfterRouteChange(false);
        router.navigate(['login']);
        expect(methodSpy).toHaveBeenCalled();
        done();
    });
    it('should expose alert message on error', async (done) => {
        alertService.getAlert().subscribe(message => {
            expect(message.type).toEqual("error")
            expect(message.text).toEqual("error message");
            expect(alertService.getKeepAfterRouteChange()).toBeTruthy;
            done();
        });
        alertService.error("error message", true);

    });
    it('should expose alert message on success', async (done) => {
        alertService.getAlert().subscribe(message => {
            expect(message.type).toEqual("success")
            expect(message.text).toEqual("success message");
            expect(alertService.getKeepAfterRouteChange()).toBeFalsy;
            done();
        });
        alertService.success("success message", false);
    });
});
