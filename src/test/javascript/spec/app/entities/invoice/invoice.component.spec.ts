/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceComponent } from '../../../../../../main/webapp/app/entities/invoice/invoice.component';
import { InvoiceService } from '../../../../../../main/webapp/app/entities/invoice/invoice.service';
import { Invoice } from '../../../../../../main/webapp/app/entities/invoice/invoice.model';

describe('Component Tests', () => {

    describe('Invoice Management Component', () => {
        let comp: InvoiceComponent;
        let fixture: ComponentFixture<InvoiceComponent>;
        let service: InvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceComponent],
                providers: [
                    InvoiceService
                ]
            })
            .overrideTemplate(InvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Invoice(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
