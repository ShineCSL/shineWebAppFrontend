import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ActivityConfig } from './activity-config.model';
import { ActivityConfigPopupService } from './activity-config-popup.service';
import { ActivityConfigService } from './activity-config.service';

@Component({
    selector: 'jhi-activity-config-delete-dialog',
    templateUrl: './activity-config-delete-dialog.component.html'
})
export class ActivityConfigDeleteDialogComponent {

    activityConfig: ActivityConfig;

    constructor(
        private activityConfigService: ActivityConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.activityConfigService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'activityConfigListModification',
                content: 'Deleted an activityConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-activity-config-delete-popup',
    template: ''
})
export class ActivityConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activityConfigPopupService: ActivityConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.activityConfigPopupService
                .open(ActivityConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
