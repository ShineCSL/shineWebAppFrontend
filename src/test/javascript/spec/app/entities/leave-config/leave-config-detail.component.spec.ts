/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeaveConfigDetailComponent } from '../../../../../../main/webapp/app/entities/leave-config/leave-config-detail.component';
import { LeaveConfigService } from '../../../../../../main/webapp/app/entities/leave-config/leave-config.service';
import { LeaveConfig } from '../../../../../../main/webapp/app/entities/leave-config/leave-config.model';

describe('Component Tests', () => {

    describe('LeaveConfig Management Detail Component', () => {
        let comp: LeaveConfigDetailComponent;
        let fixture: ComponentFixture<LeaveConfigDetailComponent>;
        let service: LeaveConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeaveConfigDetailComponent],
                providers: [
                    LeaveConfigService
                ]
            })
            .overrideTemplate(LeaveConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeaveConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeaveConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LeaveConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.leaveConfig).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
