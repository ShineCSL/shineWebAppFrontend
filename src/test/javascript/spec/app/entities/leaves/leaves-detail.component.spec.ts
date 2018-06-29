/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesDetailComponent } from '../../../../../../main/webapp/app/entities/leaves/leaves-detail.component';
import { LeavesService } from '../../../../../../main/webapp/app/entities/leaves/leaves.service';
import { Leaves } from '../../../../../../main/webapp/app/entities/leaves/leaves.model';

describe('Component Tests', () => {

    describe('Leaves Management Detail Component', () => {
        let comp: LeavesDetailComponent;
        let fixture: ComponentFixture<LeavesDetailComponent>;
        let service: LeavesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesDetailComponent],
                providers: [
                    LeavesService
                ]
            })
            .overrideTemplate(LeavesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Leaves(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.leaves).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
