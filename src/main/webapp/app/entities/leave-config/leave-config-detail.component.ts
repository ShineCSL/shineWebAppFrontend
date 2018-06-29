import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LeaveConfig } from './leave-config.model';
import { LeaveConfigService } from './leave-config.service';

@Component({
    selector: 'jhi-leave-config-detail',
    templateUrl: './leave-config-detail.component.html'
})
export class LeaveConfigDetailComponent implements OnInit, OnDestroy {

    leaveConfig: LeaveConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leaveConfigService: LeaveConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeaveConfigs();
    }

    load(id) {
        this.leaveConfigService.find(id)
            .subscribe((leaveConfigResponse: HttpResponse<LeaveConfig>) => {
                this.leaveConfig = leaveConfigResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeaveConfigs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leaveConfigListModification',
            (response) => this.load(this.leaveConfig.id)
        );
    }
}
