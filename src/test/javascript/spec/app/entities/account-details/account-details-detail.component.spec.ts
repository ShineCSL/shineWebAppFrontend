/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { AccountDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/account-details/account-details-detail.component';
import { AccountDetailsService } from '../../../../../../main/webapp/app/entities/account-details/account-details.service';
import { AccountDetails } from '../../../../../../main/webapp/app/entities/account-details/account-details.model';

describe('Component Tests', () => {

    describe('AccountDetails Management Detail Component', () => {
        let comp: AccountDetailsDetailComponent;
        let fixture: ComponentFixture<AccountDetailsDetailComponent>;
        let service: AccountDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [AccountDetailsDetailComponent],
                providers: [
                    AccountDetailsService
                ]
            })
            .overrideTemplate(AccountDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AccountDetails(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.accountDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
