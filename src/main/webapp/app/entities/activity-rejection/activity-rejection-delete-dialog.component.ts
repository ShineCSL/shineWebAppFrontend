import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ActivityRejection } from './activity-rejection.model';
import { ActivityRejectionPopupService } from './activity-rejection-popup.service';
import { ActivityRejectionService } from './activity-rejection.service';

@Component({
    selector: 'jhi-activity-rejection-delete-dialog',
    templateUrl: './activity-rejection-delete-dialog.component.html'
})
export class ActivityRejectionDeleteDialogComponent {

    activityRejection: ActivityRejection;

    constructor(
        private activityRejectionService: ActivityRejectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.activityRejectionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'activityRejectionListModification',
                content: 'Deleted an activityRejection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-activity-rejection-delete-popup',
    template: ''
})
export class ActivityRejectionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activityRejectionPopupService: ActivityRejectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.activityRejectionPopupService
                .open(ActivityRejectionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
