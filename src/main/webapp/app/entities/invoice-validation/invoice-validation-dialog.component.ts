import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceValidation } from './invoice-validation.model';
import { InvoiceValidationPopupService } from './invoice-validation-popup.service';
import { InvoiceValidationService } from './invoice-validation.service';
import { Invoice, InvoiceService } from '../invoice';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-invoice-validation-dialog',
    templateUrl: './invoice-validation-dialog.component.html'
})
export class InvoiceValidationDialogComponent implements OnInit {

    invoiceValidation: InvoiceValidation;
    isSaving: boolean;

    invoices: Invoice[];

    users: User[];
    dateInvoiceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceValidationService: InvoiceValidationService,
        private invoiceService: InvoiceService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.invoiceService.query()
            .subscribe((res: HttpResponse<Invoice[]>) => { this.invoices = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoiceValidation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceValidationService.update(this.invoiceValidation));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceValidationService.create(this.invoiceValidation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceValidation>>) {
        result.subscribe((res: HttpResponse<InvoiceValidation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceValidation) {
        this.eventManager.broadcast({ name: 'invoiceValidationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInvoiceById(index: number, item: Invoice) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-validation-popup',
    template: ''
})
export class InvoiceValidationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceValidationPopupService: InvoiceValidationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceValidationPopupService
                    .open(InvoiceValidationDialogComponent as Component, params['id']);
            } else {
                this.invoiceValidationPopupService
                    .open(InvoiceValidationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
