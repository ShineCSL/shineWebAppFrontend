import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Leaves } from './leaves.model';
import { LeavesPopupService } from './leaves-popup.service';
import { LeavesService } from './leaves.service';

@Component({
    selector: 'jhi-leaves-delete-dialog',
    templateUrl: './leaves-delete-dialog.component.html'
})
export class LeavesDeleteDialogComponent {

    leaves: Leaves;

    constructor(
        private leavesService: LeavesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leavesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leavesListModification',
                content: 'Deleted an leaves'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-leaves-delete-popup',
    template: ''
})
export class LeavesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesPopupService: LeavesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leavesPopupService
                .open(LeavesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
