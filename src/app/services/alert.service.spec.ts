//import {describe,expect,it} from 'angular2/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, ReplaySubject, Observable, BehaviorSubject, of } from "rxjs";
import { AlertService } from "./alert.service";
import { RouterEvent, Router, NavigationStart, ɵROUTER_PROVIDERS, NavigationEnd } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';


describe('AlertService', () => {
    let alertService: AlertService;
    let router: Router;
    let routerEventSpy: jasmine.Spy;
    let methodSpy = jasmine.createSpyObj;
    class RouterStub {
        public url;
        public subject = new Subject();
        public events = this.subject.asObservable();

        navigate(url: string) {
            this.url = url;
            this.triggerNavEvents(url);
        }

        triggerNavEvents(url) {
            let ne = new NavigationStart(0, url, null);
            this.subject.next(ne);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
           providers: [{
                provide: Router, useClass: RouterStub
            }]
        }).compileComponents();
        router = TestBed.get(Router);
        alertService = new AlertService(router);
        methodSpy = spyOn(alertService, 'clear');
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
