/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityRejectionComponent } from '../../../../../../main/webapp/app/entities/activity-rejection/activity-rejection.component';
import { ActivityRejectionService } from '../../../../../../main/webapp/app/entities/activity-rejection/activity-rejection.service';
import { ActivityRejection } from '../../../../../../main/webapp/app/entities/activity-rejection/activity-rejection.model';

describe('Component Tests', () => {

    describe('ActivityRejection Management Component', () => {
        let comp: ActivityRejectionComponent;
        let fixture: ComponentFixture<ActivityRejectionComponent>;
        let service: ActivityRejectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityRejectionComponent],
                providers: [
                    ActivityRejectionService
                ]
            })
            .overrideTemplate(ActivityRejectionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityRejectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityRejectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ActivityRejection(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.activityRejections[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
