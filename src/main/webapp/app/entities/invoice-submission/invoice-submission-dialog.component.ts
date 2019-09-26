import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceSubmission } from './invoice-submission.model';
import { InvoiceSubmissionPopupService } from './invoice-submission-popup.service';
import { InvoiceSubmissionService } from './invoice-submission.service';
import { Invoice, InvoiceService } from '../invoice';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-invoice-submission-dialog',
    templateUrl: './invoice-submission-dialog.component.html'
})
export class InvoiceSubmissionDialogComponent implements OnInit {

    invoiceSubmission: InvoiceSubmission;
    isSaving: boolean;

    invoices: Invoice[];

    users: User[];
    dateInvoiceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceSubmissionService: InvoiceSubmissionService,
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
        if (this.invoiceSubmission.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceSubmissionService.update(this.invoiceSubmission));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceSubmissionService.create(this.invoiceSubmission));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceSubmission>>) {
        result.subscribe((res: HttpResponse<InvoiceSubmission>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceSubmission) {
        this.eventManager.broadcast({ name: 'invoiceSubmissionListModification', content: 'OK'});
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
    selector: 'jhi-invoice-submission-popup',
    template: ''
})
export class InvoiceSubmissionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceSubmissionPopupService: InvoiceSubmissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceSubmissionPopupService
                    .open(InvoiceSubmissionDialogComponent as Component, params['id']);
            } else {
                this.invoiceSubmissionPopupService
                    .open(InvoiceSubmissionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
