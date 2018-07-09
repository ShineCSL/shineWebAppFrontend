/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceConfigDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-config/invoice-config-detail.component';
import { InvoiceConfigService } from '../../../../../../main/webapp/app/entities/invoice-config/invoice-config.service';
import { InvoiceConfig } from '../../../../../../main/webapp/app/entities/invoice-config/invoice-config.model';

describe('Component Tests', () => {

    describe('InvoiceConfig Management Detail Component', () => {
        let comp: InvoiceConfigDetailComponent;
        let fixture: ComponentFixture<InvoiceConfigDetailComponent>;
        let service: InvoiceConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceConfigDetailComponent],
                providers: [
                    InvoiceConfigService
                ]
            })
            .overrideTemplate(InvoiceConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InvoiceConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoiceConfig).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
