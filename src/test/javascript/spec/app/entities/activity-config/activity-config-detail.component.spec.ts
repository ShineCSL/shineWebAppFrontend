/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityConfigDetailComponent } from '../../../../../../main/webapp/app/entities/activity-config/activity-config-detail.component';
import { ActivityConfigService } from '../../../../../../main/webapp/app/entities/activity-config/activity-config.service';
import { ActivityConfig } from '../../../../../../main/webapp/app/entities/activity-config/activity-config.model';

describe('Component Tests', () => {

    describe('ActivityConfig Management Detail Component', () => {
        let comp: ActivityConfigDetailComponent;
        let fixture: ComponentFixture<ActivityConfigDetailComponent>;
        let service: ActivityConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityConfigDetailComponent],
                providers: [
                    ActivityConfigService
                ]
            })
            .overrideTemplate(ActivityConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ActivityConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.activityConfig).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
