import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ActivityValidation } from './activity-validation.model';
import { ActivityValidationPopupService } from './activity-validation-popup.service';
import { ActivityValidationService } from './activity-validation.service';

@Component({
    selector: 'jhi-activity-validation-delete-dialog',
    templateUrl: './activity-validation-delete-dialog.component.html'
})
export class ActivityValidationDeleteDialogComponent {

    activityValidation: ActivityValidation;

    constructor(
        private activityValidationService: ActivityValidationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.activityValidationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'activityValidationListModification',
                content: 'Deleted an activityValidation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-activity-validation-delete-popup',
    template: ''
})
export class ActivityValidationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activityValidationPopupService: ActivityValidationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.activityValidationPopupService
                .open(ActivityValidationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
