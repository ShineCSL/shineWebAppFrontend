/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityConfigDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/activity-config/activity-config-delete-dialog.component';
import { ActivityConfigService } from '../../../../../../main/webapp/app/entities/activity-config/activity-config.service';

describe('Component Tests', () => {

    describe('ActivityConfig Management Delete Component', () => {
        let comp: ActivityConfigDeleteDialogComponent;
        let fixture: ComponentFixture<ActivityConfigDeleteDialogComponent>;
        let service: ActivityConfigService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityConfigDeleteDialogComponent],
                providers: [
                    ActivityConfigService
                ]
            })
            .overrideTemplate(ActivityConfigDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityConfigDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityConfigService);
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
