import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeaveConfig } from './leave-config.model';
import { LeaveConfigPopupService } from './leave-config-popup.service';
import { LeaveConfigService } from './leave-config.service';

@Component({
    selector: 'jhi-leave-config-delete-dialog',
    templateUrl: './leave-config-delete-dialog.component.html'
})
export class LeaveConfigDeleteDialogComponent {

    leaveConfig: LeaveConfig;

    constructor(
        private leaveConfigService: LeaveConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leaveConfigService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leaveConfigListModification',
                content: 'Deleted an leaveConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-leave-config-delete-popup',
    template: ''
})
export class LeaveConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leaveConfigPopupService: LeaveConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leaveConfigPopupService
                .open(LeaveConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
