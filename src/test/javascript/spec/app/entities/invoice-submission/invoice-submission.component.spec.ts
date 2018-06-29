/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceSubmissionComponent } from '../../../../../../main/webapp/app/entities/invoice-submission/invoice-submission.component';
import { InvoiceSubmissionService } from '../../../../../../main/webapp/app/entities/invoice-submission/invoice-submission.service';
import { InvoiceSubmission } from '../../../../../../main/webapp/app/entities/invoice-submission/invoice-submission.model';

describe('Component Tests', () => {

    describe('InvoiceSubmission Management Component', () => {
        let comp: InvoiceSubmissionComponent;
        let fixture: ComponentFixture<InvoiceSubmissionComponent>;
        let service: InvoiceSubmissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceSubmissionComponent],
                providers: [
                    InvoiceSubmissionService
                ]
            })
            .overrideTemplate(InvoiceSubmissionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceSubmissionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceSubmissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InvoiceSubmission(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceSubmissions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
