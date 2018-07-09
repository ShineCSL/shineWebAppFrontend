/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesDialogComponent } from '../../../../../../main/webapp/app/entities/leaves/leaves-dialog.component';
import { LeavesService } from '../../../../../../main/webapp/app/entities/leaves/leaves.service';
import { Leaves } from '../../../../../../main/webapp/app/entities/leaves/leaves.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { TaskService } from '../../../../../../main/webapp/app/entities/task';
import { LeavesSubmissionService } from '../../../../../../main/webapp/app/entities/leaves-submission';
import { LeavesValidationService } from '../../../../../../main/webapp/app/entities/leaves-validation';
import { LeavesRejectionService } from '../../../../../../main/webapp/app/entities/leaves-rejection';

describe('Component Tests', () => {

    describe('Leaves Management Dialog Component', () => {
        let comp: LeavesDialogComponent;
        let fixture: ComponentFixture<LeavesDialogComponent>;
        let service: LeavesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesDialogComponent],
                providers: [
                    UserService,
                    TaskService,
                    LeavesSubmissionService,
                    LeavesValidationService,
                    LeavesRejectionService,
                    LeavesService
                ]
            })
            .overrideTemplate(LeavesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Leaves(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.leaves = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'leavesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Leaves();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.leaves = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'leavesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
