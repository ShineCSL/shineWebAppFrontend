/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivitySubmissionComponent } from '../../../../../../main/webapp/app/entities/activity-submission/activity-submission.component';
import { ActivitySubmissionService } from '../../../../../../main/webapp/app/entities/activity-submission/activity-submission.service';
import { ActivitySubmission } from '../../../../../../main/webapp/app/entities/activity-submission/activity-submission.model';

describe('Component Tests', () => {

    describe('ActivitySubmission Management Component', () => {
        let comp: ActivitySubmissionComponent;
        let fixture: ComponentFixture<ActivitySubmissionComponent>;
        let service: ActivitySubmissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivitySubmissionComponent],
                providers: [
                    ActivitySubmissionService
                ]
            })
            .overrideTemplate(ActivitySubmissionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivitySubmissionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivitySubmissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ActivitySubmission(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.activitySubmissions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
