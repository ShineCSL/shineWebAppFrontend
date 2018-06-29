import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LeavesSubmission } from './leaves-submission.model';
import { LeavesSubmissionService } from './leaves-submission.service';

@Component({
    selector: 'jhi-leaves-submission-detail',
    templateUrl: './leaves-submission-detail.component.html'
})
export class LeavesSubmissionDetailComponent implements OnInit, OnDestroy {

    leavesSubmission: LeavesSubmission;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leavesSubmissionService: LeavesSubmissionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeavesSubmissions();
    }

    load(id) {
        this.leavesSubmissionService.find(id)
            .subscribe((leavesSubmissionResponse: HttpResponse<LeavesSubmission>) => {
                this.leavesSubmission = leavesSubmissionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeavesSubmissions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leavesSubmissionListModification',
            (response) => this.load(this.leavesSubmission.id)
        );
    }
}
