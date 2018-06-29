import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Invoice } from './invoice.model';
import { InvoicePopupService } from './invoice-popup.service';
import { InvoiceService } from './invoice.service';
import { TypeInvoice, TypeInvoiceService } from '../type-invoice';
import { InvoiceSubmission, InvoiceSubmissionService } from '../invoice-submission';
import { InvoiceValidation, InvoiceValidationService } from '../invoice-validation';
import { InvoiceRejection, InvoiceRejectionService } from '../invoice-rejection';
import { Currency, CurrencyService } from '../currency';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-invoice-dialog',
    templateUrl: './invoice-dialog.component.html'
})
export class InvoiceDialogComponent implements OnInit {

    invoice: Invoice;
    isSaving: boolean;

    typeinvoices: TypeInvoice[];

    invoicesubmissions: InvoiceSubmission[];

    invoicevalidations: InvoiceValidation[];

    invoicerejections: InvoiceRejection[];

    currencies: Currency[];

    users: User[];
    dateInvoiceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceService,
        private typeInvoiceService: TypeInvoiceService,
        private invoiceSubmissionService: InvoiceSubmissionService,
        private invoiceValidationService: InvoiceValidationService,
        private invoiceRejectionService: InvoiceRejectionService,
        private currencyService: CurrencyService,
        private userService: UserService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.typeInvoiceService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: HttpResponse<TypeInvoice[]>) => {
                if (!this.invoice.typeInvoiceId) {
                    this.typeinvoices = res.body;
                } else {
                    this.typeInvoiceService
                        .find(this.invoice.typeInvoiceId)
                        .subscribe((subRes: HttpResponse<TypeInvoice>) => {
                            this.typeinvoices = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.invoiceSubmissionService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: HttpResponse<InvoiceSubmission[]>) => {
                if (!this.invoice.invoiceSubmissionId) {
                    this.invoicesubmissions = res.body;
                } else {
                    this.invoiceSubmissionService
                        .find(this.invoice.invoiceSubmissionId)
                        .subscribe((subRes: HttpResponse<InvoiceSubmission>) => {
                            this.invoicesubmissions = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.invoiceValidationService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: HttpResponse<InvoiceValidation[]>) => {
                if (!this.invoice.invoiceValidationId) {
                    this.invoicevalidations = res.body;
                } else {
                    this.invoiceValidationService
                        .find(this.invoice.invoiceValidationId)
                        .subscribe((subRes: HttpResponse<InvoiceValidation>) => {
                            this.invoicevalidations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.invoiceRejectionService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: HttpResponse<InvoiceRejection[]>) => {
                if (!this.invoice.invoiceRejectionId) {
                    this.invoicerejections = res.body;
                } else {
                    this.invoiceRejectionService
                        .find(this.invoice.invoiceRejectionId)
                        .subscribe((subRes: HttpResponse<InvoiceRejection>) => {
                            this.invoicerejections = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => { this.currencies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.invoice, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Invoice>>) {
        result.subscribe((res: HttpResponse<Invoice>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Invoice) {
        this.eventManager.broadcast({ name: 'invoiceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTypeInvoiceById(index: number, item: TypeInvoice) {
        return item.id;
    }

    trackInvoiceSubmissionById(index: number, item: InvoiceSubmission) {
        return item.id;
    }

    trackInvoiceValidationById(index: number, item: InvoiceValidation) {
        return item.id;
    }

    trackInvoiceRejectionById(index: number, item: InvoiceRejection) {
        return item.id;
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-popup',
    template: ''
})
export class InvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoicePopupService
                    .open(InvoiceDialogComponent as Component, params['id']);
            } else {
                this.invoicePopupService
                    .open(InvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
