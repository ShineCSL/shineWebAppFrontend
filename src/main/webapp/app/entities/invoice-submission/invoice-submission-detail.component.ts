import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceSubmission } from './invoice-submission.model';
import { InvoiceSubmissionService } from './invoice-submission.service';

@Component({
    selector: 'jhi-invoice-submission-detail',
    templateUrl: './invoice-submission-detail.component.html'
})
export class InvoiceSubmissionDetailComponent implements OnInit, OnDestroy {

    invoiceSubmission: InvoiceSubmission;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceSubmissionService: InvoiceSubmissionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceSubmissions();
    }

    load(id) {
        this.invoiceSubmissionService.find(id)
            .subscribe((invoiceSubmissionResponse: HttpResponse<InvoiceSubmission>) => {
                this.invoiceSubmission = invoiceSubmissionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceSubmissions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceSubmissionListModification',
            (response) => this.load(this.invoiceSubmission.id)
        );
    }
}
