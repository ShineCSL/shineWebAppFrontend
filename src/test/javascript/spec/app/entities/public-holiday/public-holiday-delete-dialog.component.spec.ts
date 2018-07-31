/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { PublicHolidayDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday-delete-dialog.component';
import { PublicHolidayService } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday.service';

describe('Component Tests', () => {

    describe('PublicHoliday Management Delete Component', () => {
        let comp: PublicHolidayDeleteDialogComponent;
        let fixture: ComponentFixture<PublicHolidayDeleteDialogComponent>;
        let service: PublicHolidayService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [PublicHolidayDeleteDialogComponent],
                providers: [
                    PublicHolidayService
                ]
            })
            .overrideTemplate(PublicHolidayDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublicHolidayDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicHolidayService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
