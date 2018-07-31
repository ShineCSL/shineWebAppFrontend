import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Leaves } from '../../entities/leaves/leaves.model';
import { LeavesService } from '../../entities/leaves/leaves.service';
import { LeavesPopupService } from '../../entities/leaves/leaves-popup.service';

@Component({
    selector: 'jhi-leaves-delete-dialog',
    templateUrl: './my-leaves-delete-dialog.component.html'
})
export class MyLeavesDeleteDialogComponent {

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
                .open(MyLeavesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
