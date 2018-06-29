/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesSubmissionComponent } from '../../../../../../main/webapp/app/entities/leaves-submission/leaves-submission.component';
import { LeavesSubmissionService } from '../../../../../../main/webapp/app/entities/leaves-submission/leaves-submission.service';
import { LeavesSubmission } from '../../../../../../main/webapp/app/entities/leaves-submission/leaves-submission.model';

describe('Component Tests', () => {

    describe('LeavesSubmission Management Component', () => {
        let comp: LeavesSubmissionComponent;
        let fixture: ComponentFixture<LeavesSubmissionComponent>;
        let service: LeavesSubmissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesSubmissionComponent],
                providers: [
                    LeavesSubmissionService
                ]
            })
            .overrideTemplate(LeavesSubmissionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesSubmissionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesSubmissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LeavesSubmission(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leavesSubmissions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
