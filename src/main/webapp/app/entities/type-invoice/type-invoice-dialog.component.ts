import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TypeInvoice } from './type-invoice.model';
import { TypeInvoicePopupService } from './type-invoice-popup.service';
import { TypeInvoiceService } from './type-invoice.service';

@Component({
    selector: 'jhi-type-invoice-dialog',
    templateUrl: './type-invoice-dialog.component.html'
})
export class TypeInvoiceDialogComponent implements OnInit {

    typeInvoice: TypeInvoice;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private typeInvoiceService: TypeInvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.typeInvoice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.typeInvoiceService.update(this.typeInvoice));
        } else {
            this.subscribeToSaveResponse(
                this.typeInvoiceService.create(this.typeInvoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TypeInvoice>>) {
        result.subscribe((res: HttpResponse<TypeInvoice>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TypeInvoice) {
        this.eventManager.broadcast({ name: 'typeInvoiceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-type-invoice-popup',
    template: ''
})
export class TypeInvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeInvoicePopupService: TypeInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typeInvoicePopupService
                    .open(TypeInvoiceDialogComponent as Component, params['id']);
            } else {
                this.typeInvoicePopupService
                    .open(TypeInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
