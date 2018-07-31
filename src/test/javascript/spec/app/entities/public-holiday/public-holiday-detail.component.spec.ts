/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { PublicHolidayDetailComponent } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday-detail.component';
import { PublicHolidayService } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday.service';
import { PublicHoliday } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday.model';

describe('Component Tests', () => {

    describe('PublicHoliday Management Detail Component', () => {
        let comp: PublicHolidayDetailComponent;
        let fixture: ComponentFixture<PublicHolidayDetailComponent>;
        let service: PublicHolidayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [PublicHolidayDetailComponent],
                providers: [
                    PublicHolidayService
                ]
            })
            .overrideTemplate(PublicHolidayDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublicHolidayDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicHolidayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PublicHoliday(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.publicHoliday).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
