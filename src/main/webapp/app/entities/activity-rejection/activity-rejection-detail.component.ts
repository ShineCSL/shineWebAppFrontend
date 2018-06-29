import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ActivityRejection } from './activity-rejection.model';
import { ActivityRejectionService } from './activity-rejection.service';

@Component({
    selector: 'jhi-activity-rejection-detail',
    templateUrl: './activity-rejection-detail.component.html'
})
export class ActivityRejectionDetailComponent implements OnInit, OnDestroy {

    activityRejection: ActivityRejection;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private activityRejectionService: ActivityRejectionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInActivityRejections();
    }

    load(id) {
        this.activityRejectionService.find(id)
            .subscribe((activityRejectionResponse: HttpResponse<ActivityRejection>) => {
                this.activityRejection = activityRejectionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInActivityRejections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'activityRejectionListModification',
            (response) => this.load(this.activityRejection.id)
        );
    }
}
