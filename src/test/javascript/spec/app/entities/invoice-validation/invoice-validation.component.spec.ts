/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceValidationComponent } from '../../../../../../main/webapp/app/entities/invoice-validation/invoice-validation.component';
import { InvoiceValidationService } from '../../../../../../main/webapp/app/entities/invoice-validation/invoice-validation.service';
import { InvoiceValidation } from '../../../../../../main/webapp/app/entities/invoice-validation/invoice-validation.model';

describe('Component Tests', () => {

    describe('InvoiceValidation Management Component', () => {
        let comp: InvoiceValidationComponent;
        let fixture: ComponentFixture<InvoiceValidationComponent>;
        let service: InvoiceValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceValidationComponent],
                providers: [
                    InvoiceValidationService
                ]
            })
            .overrideTemplate(InvoiceValidationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceValidationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InvoiceValidation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceValidations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
