/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityDialogComponent } from '../../../../../../main/webapp/app/entities/activity/activity-dialog.component';
import { ActivityService } from '../../../../../../main/webapp/app/entities/activity/activity.service';
import { Activity } from '../../../../../../main/webapp/app/entities/activity/activity.model';
import { TaskService } from '../../../../../../main/webapp/app/entities/task';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { ActivitySubmissionService } from '../../../../../../main/webapp/app/entities/activity-submission';
import { ActivityValidationService } from '../../../../../../main/webapp/app/entities/activity-validation';
import { ActivityRejectionService } from '../../../../../../main/webapp/app/entities/activity-rejection';
import { MissionService } from '../../../../../../main/webapp/app/entities/mission';

describe('Component Tests', () => {

    describe('Activity Management Dialog Component', () => {
        let comp: ActivityDialogComponent;
        let fixture: ComponentFixture<ActivityDialogComponent>;
        let service: ActivityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityDialogComponent],
                providers: [
                    TaskService,
                    UserService,
                    ActivitySubmissionService,
                    ActivityValidationService,
                    ActivityRejectionService,
                    MissionService,
                    ActivityService
                ]
            })
            .overrideTemplate(ActivityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Activity(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.activity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'activityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Activity();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.activity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'activityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
