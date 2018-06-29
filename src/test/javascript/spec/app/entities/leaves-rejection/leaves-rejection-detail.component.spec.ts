/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesRejectionDetailComponent } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection-detail.component';
import { LeavesRejectionService } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection.service';
import { LeavesRejection } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection.model';

describe('Component Tests', () => {

    describe('LeavesRejection Management Detail Component', () => {
        let comp: LeavesRejectionDetailComponent;
        let fixture: ComponentFixture<LeavesRejectionDetailComponent>;
        let service: LeavesRejectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesRejectionDetailComponent],
                providers: [
                    LeavesRejectionService
                ]
            })
            .overrideTemplate(LeavesRejectionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesRejectionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesRejectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LeavesRejection(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.leavesRejection).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
