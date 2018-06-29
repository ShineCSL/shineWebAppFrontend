import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeavesRejection } from './leaves-rejection.model';
import { LeavesRejectionPopupService } from './leaves-rejection-popup.service';
import { LeavesRejectionService } from './leaves-rejection.service';

@Component({
    selector: 'jhi-leaves-rejection-delete-dialog',
    templateUrl: './leaves-rejection-delete-dialog.component.html'
})
export class LeavesRejectionDeleteDialogComponent {

    leavesRejection: LeavesRejection;

    constructor(
        private leavesRejectionService: LeavesRejectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leavesRejectionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leavesRejectionListModification',
                content: 'Deleted an leavesRejection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-leaves-rejection-delete-popup',
    template: ''
})
export class LeavesRejectionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesRejectionPopupService: LeavesRejectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leavesRejectionPopupService
                .open(LeavesRejectionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
