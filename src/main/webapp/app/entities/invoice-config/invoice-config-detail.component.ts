import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceConfig } from './invoice-config.model';
import { InvoiceConfigService } from './invoice-config.service';

@Component({
    selector: 'jhi-invoice-config-detail',
    templateUrl: './invoice-config-detail.component.html'
})
export class InvoiceConfigDetailComponent implements OnInit, OnDestroy {

    invoiceConfig: InvoiceConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceConfigService: InvoiceConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceConfigs();
    }

    load(id) {
        this.invoiceConfigService.find(id)
            .subscribe((invoiceConfigResponse: HttpResponse<InvoiceConfig>) => {
                this.invoiceConfig = invoiceConfigResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceConfigs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceConfigListModification',
            (response) => this.load(this.invoiceConfig.id)
        );
    }
}
