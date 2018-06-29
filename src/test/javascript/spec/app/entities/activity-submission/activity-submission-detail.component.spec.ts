/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivitySubmissionDetailComponent } from '../../../../../../main/webapp/app/entities/activity-submission/activity-submission-detail.component';
import { ActivitySubmissionService } from '../../../../../../main/webapp/app/entities/activity-submission/activity-submission.service';
import { ActivitySubmission } from '../../../../../../main/webapp/app/entities/activity-submission/activity-submission.model';

describe('Component Tests', () => {

    describe('ActivitySubmission Management Detail Component', () => {
        let comp: ActivitySubmissionDetailComponent;
        let fixture: ComponentFixture<ActivitySubmissionDetailComponent>;
        let service: ActivitySubmissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivitySubmissionDetailComponent],
                providers: [
                    ActivitySubmissionService
                ]
            })
            .overrideTemplate(ActivitySubmissionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivitySubmissionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivitySubmissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ActivitySubmission(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.activitySubmission).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
