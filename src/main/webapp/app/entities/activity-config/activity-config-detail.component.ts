import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ActivityConfig } from './activity-config.model';
import { ActivityConfigService } from './activity-config.service';

@Component({
    selector: 'jhi-activity-config-detail',
    templateUrl: './activity-config-detail.component.html'
})
export class ActivityConfigDetailComponent implements OnInit, OnDestroy {

    activityConfig: ActivityConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private activityConfigService: ActivityConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInActivityConfigs();
    }

    load(id) {
        this.activityConfigService.find(id)
            .subscribe((activityConfigResponse: HttpResponse<ActivityConfig>) => {
                this.activityConfig = activityConfigResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInActivityConfigs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'activityConfigListModification',
            (response) => this.load(this.activityConfig.id)
        );
    }
}
