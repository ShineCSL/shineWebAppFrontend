import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceConfig } from './invoice-config.model';
import { InvoiceConfigPopupService } from './invoice-config-popup.service';
import { InvoiceConfigService } from './invoice-config.service';

@Component({
    selector: 'jhi-invoice-config-delete-dialog',
    templateUrl: './invoice-config-delete-dialog.component.html'
})
export class InvoiceConfigDeleteDialogComponent {

    invoiceConfig: InvoiceConfig;

    constructor(
        private invoiceConfigService: InvoiceConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceConfigService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceConfigListModification',
                content: 'Deleted an invoiceConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-config-delete-popup',
    template: ''
})
export class InvoiceConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceConfigPopupService: InvoiceConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceConfigPopupService
                .open(InvoiceConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
