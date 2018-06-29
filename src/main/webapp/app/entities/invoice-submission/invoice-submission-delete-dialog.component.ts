import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceSubmission } from './invoice-submission.model';
import { InvoiceSubmissionPopupService } from './invoice-submission-popup.service';
import { InvoiceSubmissionService } from './invoice-submission.service';

@Component({
    selector: 'jhi-invoice-submission-delete-dialog',
    templateUrl: './invoice-submission-delete-dialog.component.html'
})
export class InvoiceSubmissionDeleteDialogComponent {

    invoiceSubmission: InvoiceSubmission;

    constructor(
        private invoiceSubmissionService: InvoiceSubmissionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceSubmissionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceSubmissionListModification',
                content: 'Deleted an invoiceSubmission'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-submission-delete-popup',
    template: ''
})
export class InvoiceSubmissionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceSubmissionPopupService: InvoiceSubmissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceSubmissionPopupService
                .open(InvoiceSubmissionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
