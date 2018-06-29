/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceRejectionDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-rejection/invoice-rejection-detail.component';
import { InvoiceRejectionService } from '../../../../../../main/webapp/app/entities/invoice-rejection/invoice-rejection.service';
import { InvoiceRejection } from '../../../../../../main/webapp/app/entities/invoice-rejection/invoice-rejection.model';

describe('Component Tests', () => {

    describe('InvoiceRejection Management Detail Component', () => {
        let comp: InvoiceRejectionDetailComponent;
        let fixture: ComponentFixture<InvoiceRejectionDetailComponent>;
        let service: InvoiceRejectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceRejectionDetailComponent],
                providers: [
                    InvoiceRejectionService
                ]
            })
            .overrideTemplate(InvoiceRejectionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceRejectionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceRejectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InvoiceRejection(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoiceRejection).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
