import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceValidation } from './invoice-validation.model';
import { InvoiceValidationService } from './invoice-validation.service';

@Component({
    selector: 'jhi-invoice-validation-detail',
    templateUrl: './invoice-validation-detail.component.html'
})
export class InvoiceValidationDetailComponent implements OnInit, OnDestroy {

    invoiceValidation: InvoiceValidation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceValidationService: InvoiceValidationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceValidations();
    }

    load(id) {
        this.invoiceValidationService.find(id)
            .subscribe((invoiceValidationResponse: HttpResponse<InvoiceValidation>) => {
                this.invoiceValidation = invoiceValidationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceValidations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceValidationListModification',
            (response) => this.load(this.invoiceValidation.id)
        );
    }
}
