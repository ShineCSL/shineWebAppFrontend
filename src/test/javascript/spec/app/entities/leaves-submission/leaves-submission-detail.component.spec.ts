/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesSubmissionDetailComponent } from '../../../../../../main/webapp/app/entities/leaves-submission/leaves-submission-detail.component';
import { LeavesSubmissionService } from '../../../../../../main/webapp/app/entities/leaves-submission/leaves-submission.service';
import { LeavesSubmission } from '../../../../../../main/webapp/app/entities/leaves-submission/leaves-submission.model';

describe('Component Tests', () => {

    describe('LeavesSubmission Management Detail Component', () => {
        let comp: LeavesSubmissionDetailComponent;
        let fixture: ComponentFixture<LeavesSubmissionDetailComponent>;
        let service: LeavesSubmissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesSubmissionDetailComponent],
                providers: [
                    LeavesSubmissionService
                ]
            })
            .overrideTemplate(LeavesSubmissionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesSubmissionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesSubmissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LeavesSubmission(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.leavesSubmission).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
