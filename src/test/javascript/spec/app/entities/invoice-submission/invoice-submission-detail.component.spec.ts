/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceSubmissionDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-submission/invoice-submission-detail.component';
import { InvoiceSubmissionService } from '../../../../../../main/webapp/app/entities/invoice-submission/invoice-submission.service';
import { InvoiceSubmission } from '../../../../../../main/webapp/app/entities/invoice-submission/invoice-submission.model';

describe('Component Tests', () => {

    describe('InvoiceSubmission Management Detail Component', () => {
        let comp: InvoiceSubmissionDetailComponent;
        let fixture: ComponentFixture<InvoiceSubmissionDetailComponent>;
        let service: InvoiceSubmissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceSubmissionDetailComponent],
                providers: [
                    InvoiceSubmissionService
                ]
            })
            .overrideTemplate(InvoiceSubmissionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceSubmissionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceSubmissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InvoiceSubmission(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoiceSubmission).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
