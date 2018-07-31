/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { TeamComponent } from '../../../../../../main/webapp/app/entities/team/team.component';
import { TeamService } from '../../../../../../main/webapp/app/entities/team/team.service';
import { Team } from '../../../../../../main/webapp/app/entities/team/team.model';

describe('Component Tests', () => {

    describe('Team Management Component', () => {
        let comp: TeamComponent;
        let fixture: ComponentFixture<TeamComponent>;
        let service: TeamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [TeamComponent],
                providers: [
                    TeamService
                ]
            })
            .overrideTemplate(TeamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Team(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.teams[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
