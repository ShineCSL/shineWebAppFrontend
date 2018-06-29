import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LeavesValidation } from './leaves-validation.model';
import { LeavesValidationService } from './leaves-validation.service';

@Component({
    selector: 'jhi-leaves-validation-detail',
    templateUrl: './leaves-validation-detail.component.html'
})
export class LeavesValidationDetailComponent implements OnInit, OnDestroy {

    leavesValidation: LeavesValidation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leavesValidationService: LeavesValidationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeavesValidations();
    }

    load(id) {
        this.leavesValidationService.find(id)
            .subscribe((leavesValidationResponse: HttpResponse<LeavesValidation>) => {
                this.leavesValidation = leavesValidationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeavesValidations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leavesValidationListModification',
            (response) => this.load(this.leavesValidation.id)
        );
    }
}
