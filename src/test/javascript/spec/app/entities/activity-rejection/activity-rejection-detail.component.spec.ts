/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityRejectionDetailComponent } from '../../../../../../main/webapp/app/entities/activity-rejection/activity-rejection-detail.component';
import { ActivityRejectionService } from '../../../../../../main/webapp/app/entities/activity-rejection/activity-rejection.service';
import { ActivityRejection } from '../../../../../../main/webapp/app/entities/activity-rejection/activity-rejection.model';

describe('Component Tests', () => {

    describe('ActivityRejection Management Detail Component', () => {
        let comp: ActivityRejectionDetailComponent;
        let fixture: ComponentFixture<ActivityRejectionDetailComponent>;
        let service: ActivityRejectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityRejectionDetailComponent],
                providers: [
                    ActivityRejectionService
                ]
            })
            .overrideTemplate(ActivityRejectionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityRejectionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityRejectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ActivityRejection(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.activityRejection).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
