/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesValidationDetailComponent } from '../../../../../../main/webapp/app/entities/leaves-validation/leaves-validation-detail.component';
import { LeavesValidationService } from '../../../../../../main/webapp/app/entities/leaves-validation/leaves-validation.service';
import { LeavesValidation } from '../../../../../../main/webapp/app/entities/leaves-validation/leaves-validation.model';

describe('Component Tests', () => {

    describe('LeavesValidation Management Detail Component', () => {
        let comp: LeavesValidationDetailComponent;
        let fixture: ComponentFixture<LeavesValidationDetailComponent>;
        let service: LeavesValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesValidationDetailComponent],
                providers: [
                    LeavesValidationService
                ]
            })
            .overrideTemplate(LeavesValidationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesValidationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LeavesValidation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.leavesValidation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
