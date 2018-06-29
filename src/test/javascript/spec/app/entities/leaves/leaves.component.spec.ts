/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesComponent } from '../../../../../../main/webapp/app/entities/leaves/leaves.component';
import { LeavesService } from '../../../../../../main/webapp/app/entities/leaves/leaves.service';
import { Leaves } from '../../../../../../main/webapp/app/entities/leaves/leaves.model';

describe('Component Tests', () => {

    describe('Leaves Management Component', () => {
        let comp: LeavesComponent;
        let fixture: ComponentFixture<LeavesComponent>;
        let service: LeavesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesComponent],
                providers: [
                    LeavesService
                ]
            })
            .overrideTemplate(LeavesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Leaves(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leaves[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
