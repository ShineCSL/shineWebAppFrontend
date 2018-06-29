import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AccountDetails } from './account-details.model';
import { AccountDetailsService } from './account-details.service';

@Component({
    selector: 'jhi-account-details-detail',
    templateUrl: './account-details-detail.component.html'
})
export class AccountDetailsDetailComponent implements OnInit, OnDestroy {

    accountDetails: AccountDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accountDetailsService: AccountDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAccountDetails();
    }

    load(id) {
        this.accountDetailsService.find(id)
            .subscribe((accountDetailsResponse: HttpResponse<AccountDetails>) => {
                this.accountDetails = accountDetailsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccountDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'accountDetailsListModification',
            (response) => this.load(this.accountDetails.id)
        );
    }
}
