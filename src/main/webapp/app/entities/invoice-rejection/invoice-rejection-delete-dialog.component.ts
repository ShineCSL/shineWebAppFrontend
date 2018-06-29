import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceRejection } from './invoice-rejection.model';
import { InvoiceRejectionPopupService } from './invoice-rejection-popup.service';
import { InvoiceRejectionService } from './invoice-rejection.service';

@Component({
    selector: 'jhi-invoice-rejection-delete-dialog',
    templateUrl: './invoice-rejection-delete-dialog.component.html'
})
export class InvoiceRejectionDeleteDialogComponent {

    invoiceRejection: InvoiceRejection;

    constructor(
        private invoiceRejectionService: InvoiceRejectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceRejectionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceRejectionListModification',
                content: 'Deleted an invoiceRejection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-rejection-delete-popup',
    template: ''
})
export class InvoiceRejectionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceRejectionPopupService: InvoiceRejectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceRejectionPopupService
                .open(InvoiceRejectionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
