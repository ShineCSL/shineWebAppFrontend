/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { AccountDetailsComponent } from '../../../../../../main/webapp/app/entities/account-details/account-details.component';
import { AccountDetailsService } from '../../../../../../main/webapp/app/entities/account-details/account-details.service';
import { AccountDetails } from '../../../../../../main/webapp/app/entities/account-details/account-details.model';

describe('Component Tests', () => {

    describe('AccountDetails Management Component', () => {
        let comp: AccountDetailsComponent;
        let fixture: ComponentFixture<AccountDetailsComponent>;
        let service: AccountDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [AccountDetailsComponent],
                providers: [
                    AccountDetailsService
                ]
            })
            .overrideTemplate(AccountDetailsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AccountDetails(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.accountDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
