import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ActivitySubmission } from './activity-submission.model';
import { ActivitySubmissionService } from './activity-submission.service';

@Component({
    selector: 'jhi-activity-submission-detail',
    templateUrl: './activity-submission-detail.component.html'
})
export class ActivitySubmissionDetailComponent implements OnInit, OnDestroy {

    activitySubmission: ActivitySubmission;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private activitySubmissionService: ActivitySubmissionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInActivitySubmissions();
    }

    load(id) {
        this.activitySubmissionService.find(id)
            .subscribe((activitySubmissionResponse: HttpResponse<ActivitySubmission>) => {
                this.activitySubmission = activitySubmissionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInActivitySubmissions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'activitySubmissionListModification',
            (response) => this.load(this.activitySubmission.id)
        );
    }
}
