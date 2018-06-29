import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceValidation } from './invoice-validation.model';
import { InvoiceValidationPopupService } from './invoice-validation-popup.service';
import { InvoiceValidationService } from './invoice-validation.service';

@Component({
    selector: 'jhi-invoice-validation-delete-dialog',
    templateUrl: './invoice-validation-delete-dialog.component.html'
})
export class InvoiceValidationDeleteDialogComponent {

    invoiceValidation: InvoiceValidation;

    constructor(
        private invoiceValidationService: InvoiceValidationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceValidationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceValidationListModification',
                content: 'Deleted an invoiceValidation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-validation-delete-popup',
    template: ''
})
export class InvoiceValidationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceValidationPopupService: InvoiceValidationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceValidationPopupService
                .open(InvoiceValidationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
