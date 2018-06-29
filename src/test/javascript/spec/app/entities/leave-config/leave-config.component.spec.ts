/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeaveConfigComponent } from '../../../../../../main/webapp/app/entities/leave-config/leave-config.component';
import { LeaveConfigService } from '../../../../../../main/webapp/app/entities/leave-config/leave-config.service';
import { LeaveConfig } from '../../../../../../main/webapp/app/entities/leave-config/leave-config.model';

describe('Component Tests', () => {

    describe('LeaveConfig Management Component', () => {
        let comp: LeaveConfigComponent;
        let fixture: ComponentFixture<LeaveConfigComponent>;
        let service: LeaveConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeaveConfigComponent],
                providers: [
                    LeaveConfigService
                ]
            })
            .overrideTemplate(LeaveConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeaveConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeaveConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LeaveConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leaveConfigs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
