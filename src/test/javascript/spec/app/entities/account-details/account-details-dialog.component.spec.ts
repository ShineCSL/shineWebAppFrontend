/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { AccountDetailsDialogComponent } from '../../../../../../main/webapp/app/entities/account-details/account-details-dialog.component';
import { AccountDetailsService } from '../../../../../../main/webapp/app/entities/account-details/account-details.service';
import { AccountDetails } from '../../../../../../main/webapp/app/entities/account-details/account-details.model';
import { ClientService } from '../../../../../../main/webapp/app/entities/client';
import { InvoiceService } from '../../../../../../main/webapp/app/entities/invoice';
import { CurrencyService } from '../../../../../../main/webapp/app/entities/currency';

describe('Component Tests', () => {

    describe('AccountDetails Management Dialog Component', () => {
        let comp: AccountDetailsDialogComponent;
        let fixture: ComponentFixture<AccountDetailsDialogComponent>;
        let service: AccountDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [AccountDetailsDialogComponent],
                providers: [
                    ClientService,
                    InvoiceService,
                    CurrencyService,
                    AccountDetailsService
                ]
            })
            .overrideTemplate(AccountDetailsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountDetailsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountDetailsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AccountDetails(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.accountDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'accountDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AccountDetails();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.accountDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'accountDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
