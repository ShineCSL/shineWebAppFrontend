/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { MissionComponent } from '../../../../../../main/webapp/app/entities/mission/mission.component';
import { MissionService } from '../../../../../../main/webapp/app/entities/mission/mission.service';
import { Mission } from '../../../../../../main/webapp/app/entities/mission/mission.model';

describe('Component Tests', () => {

    describe('Mission Management Component', () => {
        let comp: MissionComponent;
        let fixture: ComponentFixture<MissionComponent>;
        let service: MissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [MissionComponent],
                providers: [
                    MissionService
                ]
            })
            .overrideTemplate(MissionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MissionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Mission(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.missions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
