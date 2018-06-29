import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LeavesRejection } from './leaves-rejection.model';
import { LeavesRejectionService } from './leaves-rejection.service';

@Component({
    selector: 'jhi-leaves-rejection-detail',
    templateUrl: './leaves-rejection-detail.component.html'
})
export class LeavesRejectionDetailComponent implements OnInit, OnDestroy {

    leavesRejection: LeavesRejection;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leavesRejectionService: LeavesRejectionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeavesRejections();
    }

    load(id) {
        this.leavesRejectionService.find(id)
            .subscribe((leavesRejectionResponse: HttpResponse<LeavesRejection>) => {
                this.leavesRejection = leavesRejectionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeavesRejections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leavesRejectionListModification',
            (response) => this.load(this.leavesRejection.id)
        );
    }
}
