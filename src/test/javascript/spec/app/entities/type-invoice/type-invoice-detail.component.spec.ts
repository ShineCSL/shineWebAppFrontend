/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { TypeInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/type-invoice/type-invoice-detail.component';
import { TypeInvoiceService } from '../../../../../../main/webapp/app/entities/type-invoice/type-invoice.service';
import { TypeInvoice } from '../../../../../../main/webapp/app/entities/type-invoice/type-invoice.model';

describe('Component Tests', () => {

    describe('TypeInvoice Management Detail Component', () => {
        let comp: TypeInvoiceDetailComponent;
        let fixture: ComponentFixture<TypeInvoiceDetailComponent>;
        let service: TypeInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [TypeInvoiceDetailComponent],
                providers: [
                    TypeInvoiceService
                ]
            })
            .overrideTemplate(TypeInvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TypeInvoice(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.typeInvoice).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
