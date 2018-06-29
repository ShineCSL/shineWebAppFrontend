import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AccountDetails } from './account-details.model';
import { AccountDetailsPopupService } from './account-details-popup.service';
import { AccountDetailsService } from './account-details.service';
import { Client, ClientService } from '../client';
import { User, UserService } from '../../shared';
import { Invoice, InvoiceService } from '../invoice';
import { Currency, CurrencyService } from '../currency';

@Component({
    selector: 'jhi-account-details-dialog',
    templateUrl: './account-details-dialog.component.html'
})
export class AccountDetailsDialogComponent implements OnInit {

    accountDetails: AccountDetails;
    isSaving: boolean;

    clients: Client[];

    users: User[];

    invoices: Invoice[];

    currencies: Currency[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private accountDetailsService: AccountDetailsService,
        private clientService: ClientService,
        private userService: UserService,
        private invoiceService: InvoiceService,
        private currencyService: CurrencyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.invoiceService
            .query({filter: 'accountdetails-is-null'})
            .subscribe((res: HttpResponse<Invoice[]>) => {
                if (!this.accountDetails.invoiceId) {
                    this.invoices = res.body;
                } else {
                    this.invoiceService
                        .find(this.accountDetails.invoiceId)
                        .subscribe((subRes: HttpResponse<Invoice>) => {
                            this.invoices = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.currencyService.query()
            .subscribe((res: HttpResponse<Currency[]>) => { this.currencies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accountDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountDetailsService.update(this.accountDetails));
        } else {
            this.subscribeToSaveResponse(
                this.accountDetailsService.create(this.accountDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AccountDetails>>) {
        result.subscribe((res: HttpResponse<AccountDetails>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AccountDetails) {
        this.eventManager.broadcast({ name: 'accountDetailsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackInvoiceById(index: number, item: Invoice) {
        return item.id;
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-account-details-popup',
    template: ''
})
export class AccountDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountDetailsPopupService: AccountDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.accountDetailsPopupService
                    .open(AccountDetailsDialogComponent as Component, params['id']);
            } else {
                this.accountDetailsPopupService
                    .open(AccountDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
