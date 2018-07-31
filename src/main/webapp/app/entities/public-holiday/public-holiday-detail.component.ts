import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PublicHoliday } from './public-holiday.model';
import { PublicHolidayService } from './public-holiday.service';

@Component({
    selector: 'jhi-public-holiday-detail',
    templateUrl: './public-holiday-detail.component.html'
})
export class PublicHolidayDetailComponent implements OnInit, OnDestroy {

    publicHoliday: PublicHoliday;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private publicHolidayService: PublicHolidayService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPublicHolidays();
    }

    load(id) {
        this.publicHolidayService.find(id)
            .subscribe((publicHolidayResponse: HttpResponse<PublicHoliday>) => {
                this.publicHoliday = publicHolidayResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPublicHolidays() {
        this.eventSubscriber = this.eventManager.subscribe(
            'publicHolidayListModification',
            (response) => this.load(this.publicHoliday.id)
        );
    }
}
