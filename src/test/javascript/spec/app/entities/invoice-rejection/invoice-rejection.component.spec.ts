/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceRejectionComponent } from '../../../../../../main/webapp/app/entities/invoice-rejection/invoice-rejection.component';
import { InvoiceRejectionService } from '../../../../../../main/webapp/app/entities/invoice-rejection/invoice-rejection.service';
import { InvoiceRejection } from '../../../../../../main/webapp/app/entities/invoice-rejection/invoice-rejection.model';

describe('Component Tests', () => {

    describe('InvoiceRejection Management Component', () => {
        let comp: InvoiceRejectionComponent;
        let fixture: ComponentFixture<InvoiceRejectionComponent>;
        let service: InvoiceRejectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceRejectionComponent],
                providers: [
                    InvoiceRejectionService
                ]
            })
            .overrideTemplate(InvoiceRejectionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceRejectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceRejectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InvoiceRejection(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceRejections[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
