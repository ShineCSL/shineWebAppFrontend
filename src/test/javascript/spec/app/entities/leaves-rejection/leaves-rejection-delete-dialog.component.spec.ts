/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesRejectionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection-delete-dialog.component';
import { LeavesRejectionService } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection.service';

describe('Component Tests', () => {

    describe('LeavesRejection Management Delete Component', () => {
        let comp: LeavesRejectionDeleteDialogComponent;
        let fixture: ComponentFixture<LeavesRejectionDeleteDialogComponent>;
        let service: LeavesRejectionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesRejectionDeleteDialogComponent],
                providers: [
                    LeavesRejectionService
                ]
            })
            .overrideTemplate(LeavesRejectionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesRejectionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesRejectionService);
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
