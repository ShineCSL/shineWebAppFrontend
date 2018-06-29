/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityValidationDetailComponent } from '../../../../../../main/webapp/app/entities/activity-validation/activity-validation-detail.component';
import { ActivityValidationService } from '../../../../../../main/webapp/app/entities/activity-validation/activity-validation.service';
import { ActivityValidation } from '../../../../../../main/webapp/app/entities/activity-validation/activity-validation.model';

describe('Component Tests', () => {

    describe('ActivityValidation Management Detail Component', () => {
        let comp: ActivityValidationDetailComponent;
        let fixture: ComponentFixture<ActivityValidationDetailComponent>;
        let service: ActivityValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityValidationDetailComponent],
                providers: [
                    ActivityValidationService
                ]
            })
            .overrideTemplate(ActivityValidationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityValidationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ActivityValidation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.activityValidation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
