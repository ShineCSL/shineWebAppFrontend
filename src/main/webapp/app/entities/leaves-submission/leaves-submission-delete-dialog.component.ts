import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeavesSubmission } from './leaves-submission.model';
import { LeavesSubmissionPopupService } from './leaves-submission-popup.service';
import { LeavesSubmissionService } from './leaves-submission.service';

@Component({
    selector: 'jhi-leaves-submission-delete-dialog',
    templateUrl: './leaves-submission-delete-dialog.component.html'
})
export class LeavesSubmissionDeleteDialogComponent {

    leavesSubmission: LeavesSubmission;

    constructor(
        private leavesSubmissionService: LeavesSubmissionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leavesSubmissionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leavesSubmissionListModification',
                content: 'Deleted an leavesSubmission'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-leaves-submission-delete-popup',
    template: ''
})
export class LeavesSubmissionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesSubmissionPopupService: LeavesSubmissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leavesSubmissionPopupService
                .open(LeavesSubmissionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
