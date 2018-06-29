import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TypeInvoice } from './type-invoice.model';
import { TypeInvoicePopupService } from './type-invoice-popup.service';
import { TypeInvoiceService } from './type-invoice.service';

@Component({
    selector: 'jhi-type-invoice-delete-dialog',
    templateUrl: './type-invoice-delete-dialog.component.html'
})
export class TypeInvoiceDeleteDialogComponent {

    typeInvoice: TypeInvoice;

    constructor(
        private typeInvoiceService: TypeInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeInvoiceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'typeInvoiceListModification',
                content: 'Deleted an typeInvoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-invoice-delete-popup',
    template: ''
})
export class TypeInvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeInvoicePopupService: TypeInvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.typeInvoicePopupService
                .open(TypeInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
