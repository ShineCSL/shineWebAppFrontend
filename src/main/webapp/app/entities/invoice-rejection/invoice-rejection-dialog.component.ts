import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceRejection } from './invoice-rejection.model';
import { InvoiceRejectionPopupService } from './invoice-rejection-popup.service';
import { InvoiceRejectionService } from './invoice-rejection.service';
import { Invoice, InvoiceService } from '../invoice';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-invoice-rejection-dialog',
    templateUrl: './invoice-rejection-dialog.component.html'
})
export class InvoiceRejectionDialogComponent implements OnInit {

    invoiceRejection: InvoiceRejection;
    isSaving: boolean;

    invoices: Invoice[];

    users: User[];
    dateInvoiceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceRejectionService: InvoiceRejectionService,
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
        if (this.invoiceRejection.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceRejectionService.update(this.invoiceRejection));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceRejectionService.create(this.invoiceRejection));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceRejection>>) {
        result.subscribe((res: HttpResponse<InvoiceRejection>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceRejection) {
        this.eventManager.broadcast({ name: 'invoiceRejectionListModification', content: 'OK'});
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
    selector: 'jhi-invoice-rejection-popup',
    template: ''
})
export class InvoiceRejectionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceRejectionPopupService: InvoiceRejectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceRejectionPopupService
                    .open(InvoiceRejectionDialogComponent as Component, params['id']);
            } else {
                this.invoiceRejectionPopupService
                    .open(InvoiceRejectionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
