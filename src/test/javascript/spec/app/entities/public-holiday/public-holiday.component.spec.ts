/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShineWebAppFrontendTestModule } from '../../../test.module';
import { PublicHolidayComponent } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday.component';
import { PublicHolidayService } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday.service';
import { PublicHoliday } from '../../../../../../main/webapp/app/entities/public-holiday/public-holiday.model';

describe('Component Tests', () => {

    describe('PublicHoliday Management Component', () => {
        let comp: PublicHolidayComponent;
        let fixture: ComponentFixture<PublicHolidayComponent>;
        let service: PublicHolidayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShineWebAppFrontendTestModule],
                declarations: [PublicHolidayComponent],
                providers: [
                    PublicHolidayService
                ]
            })
            .overrideTemplate(PublicHolidayComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublicHolidayComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicHolidayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PublicHoliday(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.publicHolidays[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
