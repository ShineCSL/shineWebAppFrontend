/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { ActivityConfigComponent } from '../../../../../../main/webapp/app/entities/activity-config/activity-config.component';
import { ActivityConfigService } from '../../../../../../main/webapp/app/entities/activity-config/activity-config.service';
import { ActivityConfig } from '../../../../../../main/webapp/app/entities/activity-config/activity-config.model';

describe('Component Tests', () => {

    describe('ActivityConfig Management Component', () => {
        let comp: ActivityConfigComponent;
        let fixture: ComponentFixture<ActivityConfigComponent>;
        let service: ActivityConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [ActivityConfigComponent],
                providers: [
                    ActivityConfigService
                ]
            })
            .overrideTemplate(ActivityConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActivityConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ActivityConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.activityConfigs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
