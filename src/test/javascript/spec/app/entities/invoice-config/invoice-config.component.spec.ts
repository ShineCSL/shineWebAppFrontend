/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { InvoiceConfigComponent } from '../../../../../../main/webapp/app/entities/invoice-config/invoice-config.component';
import { InvoiceConfigService } from '../../../../../../main/webapp/app/entities/invoice-config/invoice-config.service';
import { InvoiceConfig } from '../../../../../../main/webapp/app/entities/invoice-config/invoice-config.model';

describe('Component Tests', () => {

    describe('InvoiceConfig Management Component', () => {
        let comp: InvoiceConfigComponent;
        let fixture: ComponentFixture<InvoiceConfigComponent>;
        let service: InvoiceConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [InvoiceConfigComponent],
                providers: [
                    InvoiceConfigService
                ]
            })
            .overrideTemplate(InvoiceConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InvoiceConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceConfigs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
