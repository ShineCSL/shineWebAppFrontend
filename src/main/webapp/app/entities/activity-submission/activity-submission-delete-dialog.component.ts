import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ActivitySubmission } from './activity-submission.model';
import { ActivitySubmissionPopupService } from './activity-submission-popup.service';
import { ActivitySubmissionService } from './activity-submission.service';

@Component({
    selector: 'jhi-activity-submission-delete-dialog',
    templateUrl: './activity-submission-delete-dialog.component.html'
})
export class ActivitySubmissionDeleteDialogComponent {

    activitySubmission: ActivitySubmission;

    constructor(
        private activitySubmissionService: ActivitySubmissionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.activitySubmissionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'activitySubmissionListModification',
                content: 'Deleted an activitySubmission'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-activity-submission-delete-popup',
    template: ''
})
export class ActivitySubmissionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activitySubmissionPopupService: ActivitySubmissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.activitySubmissionPopupService
                .open(ActivitySubmissionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
