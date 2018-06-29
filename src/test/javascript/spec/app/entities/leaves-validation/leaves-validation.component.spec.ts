/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesValidationComponent } from '../../../../../../main/webapp/app/entities/leaves-validation/leaves-validation.component';
import { LeavesValidationService } from '../../../../../../main/webapp/app/entities/leaves-validation/leaves-validation.service';
import { LeavesValidation } from '../../../../../../main/webapp/app/entities/leaves-validation/leaves-validation.model';

describe('Component Tests', () => {

    describe('LeavesValidation Management Component', () => {
        let comp: LeavesValidationComponent;
        let fixture: ComponentFixture<LeavesValidationComponent>;
        let service: LeavesValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesValidationComponent],
                providers: [
                    LeavesValidationService
                ]
            })
            .overrideTemplate(LeavesValidationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesValidationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LeavesValidation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leavesValidations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
