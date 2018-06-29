import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceRejection } from './invoice-rejection.model';
import { InvoiceRejectionService } from './invoice-rejection.service';

@Component({
    selector: 'jhi-invoice-rejection-detail',
    templateUrl: './invoice-rejection-detail.component.html'
})
export class InvoiceRejectionDetailComponent implements OnInit, OnDestroy {

    invoiceRejection: InvoiceRejection;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceRejectionService: InvoiceRejectionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceRejections();
    }

    load(id) {
        this.invoiceRejectionService.find(id)
            .subscribe((invoiceRejectionResponse: HttpResponse<InvoiceRejection>) => {
                this.invoiceRejection = invoiceRejectionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceRejections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceRejectionListModification',
            (response) => this.load(this.invoiceRejection.id)
        );
    }
}
