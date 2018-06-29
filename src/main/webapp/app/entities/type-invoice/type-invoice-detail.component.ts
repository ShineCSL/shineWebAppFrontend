import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TypeInvoice } from './type-invoice.model';
import { TypeInvoiceService } from './type-invoice.service';

@Component({
    selector: 'jhi-type-invoice-detail',
    templateUrl: './type-invoice-detail.component.html'
})
export class TypeInvoiceDetailComponent implements OnInit, OnDestroy {

    typeInvoice: TypeInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private typeInvoiceService: TypeInvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTypeInvoices();
    }

    load(id) {
        this.typeInvoiceService.find(id)
            .subscribe((typeInvoiceResponse: HttpResponse<TypeInvoice>) => {
                this.typeInvoice = typeInvoiceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTypeInvoices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeInvoiceListModification',
            (response) => this.load(this.typeInvoice.id)
        );
    }
}
