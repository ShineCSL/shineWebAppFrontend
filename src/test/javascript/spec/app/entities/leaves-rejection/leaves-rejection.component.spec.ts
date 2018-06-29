/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { LeavesRejectionComponent } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection.component';
import { LeavesRejectionService } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection.service';
import { LeavesRejection } from '../../../../../../main/webapp/app/entities/leaves-rejection/leaves-rejection.model';

describe('Component Tests', () => {

    describe('LeavesRejection Management Component', () => {
        let comp: LeavesRejectionComponent;
        let fixture: ComponentFixture<LeavesRejectionComponent>;
        let service: LeavesRejectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [LeavesRejectionComponent],
                providers: [
                    LeavesRejectionService
                ]
            })
            .overrideTemplate(LeavesRejectionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeavesRejectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeavesRejectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LeavesRejection(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leavesRejections[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
