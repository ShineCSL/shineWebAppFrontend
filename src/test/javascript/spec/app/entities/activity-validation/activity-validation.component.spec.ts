/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityValidationComponent } from '../../../../../../main/webapp/app/entities/activity-validation/activity-validation.component';
import { ActivityValidationService } from '../../../../../../main/webapp/app/entities/activity-validation/activity-validation.service';
import { ActivityValidation } from '../../../../../../main/webapp/app/entities/activity-validation/activity-validation.model';

describe('Component Tests', () => {

    describe('ActivityValidation Management Component', () => {
        let comp: ActivityValidationComponent;
        let fixture: ComponentFixture<ActivityValidationComponent>;
        let service: ActivityValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityValidationComponent],
                providers: [
                    ActivityValidationService
                ]
            })
            .overrideTemplate(ActivityValidationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityValidationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ActivityValidation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.activityValidations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
