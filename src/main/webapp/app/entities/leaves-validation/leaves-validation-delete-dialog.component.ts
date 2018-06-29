import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeavesValidation } from './leaves-validation.model';
import { LeavesValidationPopupService } from './leaves-validation-popup.service';
import { LeavesValidationService } from './leaves-validation.service';

@Component({
    selector: 'jhi-leaves-validation-delete-dialog',
    templateUrl: './leaves-validation-delete-dialog.component.html'
})
export class LeavesValidationDeleteDialogComponent {

    leavesValidation: LeavesValidation;

    constructor(
        private leavesValidationService: LeavesValidationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leavesValidationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leavesValidationListModification',
                content: 'Deleted an leavesValidation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-leaves-validation-delete-popup',
    template: ''
})
export class LeavesValidationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesValidationPopupService: LeavesValidationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leavesValidationPopupService
                .open(LeavesValidationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
