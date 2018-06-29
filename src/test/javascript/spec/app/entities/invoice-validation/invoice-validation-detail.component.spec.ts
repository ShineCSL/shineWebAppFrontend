/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceValidationDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-validation/invoice-validation-detail.component';
import { InvoiceValidationService } from '../../../../../../main/webapp/app/entities/invoice-validation/invoice-validation.service';
import { InvoiceValidation } from '../../../../../../main/webapp/app/entities/invoice-validation/invoice-validation.model';

describe('Component Tests', () => {

    describe('InvoiceValidation Management Detail Component', () => {
        let comp: InvoiceValidationDetailComponent;
        let fixture: ComponentFixture<InvoiceValidationDetailComponent>;
        let service: InvoiceValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceValidationDetailComponent],
                providers: [
                    InvoiceValidationService
                ]
            })
            .overrideTemplate(InvoiceValidationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceValidationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InvoiceValidation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoiceValidation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
