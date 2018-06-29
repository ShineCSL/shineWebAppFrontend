/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { TypeInvoiceComponent } from '../../../../../../main/webapp/app/entities/type-invoice/type-invoice.component';
import { TypeInvoiceService } from '../../../../../../main/webapp/app/entities/type-invoice/type-invoice.service';
import { TypeInvoice } from '../../../../../../main/webapp/app/entities/type-invoice/type-invoice.model';

describe('Component Tests', () => {

    describe('TypeInvoice Management Component', () => {
        let comp: TypeInvoiceComponent;
        let fixture: ComponentFixture<TypeInvoiceComponent>;
        let service: TypeInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [TypeInvoiceComponent],
                providers: [
                    TypeInvoiceService
                ]
            })
            .overrideTemplate(TypeInvoiceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TypeInvoice(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.typeInvoices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
