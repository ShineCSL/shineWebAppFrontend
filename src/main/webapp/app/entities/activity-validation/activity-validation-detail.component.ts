import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ActivityValidation } from './activity-validation.model';
import { ActivityValidationService } from './activity-validation.service';

@Component({
    selector: 'jhi-activity-validation-detail',
    templateUrl: './activity-validation-detail.component.html'
})
export class ActivityValidationDetailComponent implements OnInit, OnDestroy {

    activityValidation: ActivityValidation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private activityValidationService: ActivityValidationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInActivityValidations();
    }

    load(id) {
        this.activityValidationService.find(id)
            .subscribe((activityValidationResponse: HttpResponse<ActivityValidation>) => {
                this.activityValidation = activityValidationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInActivityValidations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'activityValidationListModification',
            (response) => this.load(this.activityValidation.id)
        );
    }
}
