import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceConfig } from './invoice-config.model';
import { InvoiceConfigPopupService } from './invoice-config-popup.service';
import { InvoiceConfigService } from './invoice-config.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-invoice-config-dialog',
    templateUrl: './invoice-config-dialog.component.html'
})
export class InvoiceConfigDialogComponent implements OnInit {

    invoiceConfig: InvoiceConfig;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceConfigService: InvoiceConfigService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoiceConfig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceConfigService.update(this.invoiceConfig));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceConfigService.create(this.invoiceConfig));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceConfig>>) {
        result.subscribe((res: HttpResponse<InvoiceConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceConfig) {
        this.eventManager.broadcast({ name: 'invoiceConfigListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-config-popup',
    template: ''
})
export class InvoiceConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceConfigPopupService: InvoiceConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceConfigPopupService
                    .open(InvoiceConfigDialogComponent as Component, params['id']);
            } else {
                this.invoiceConfigPopupService
                    .open(InvoiceConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
