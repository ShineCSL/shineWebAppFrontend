import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Leaves } from '../../entities/leaves/leaves.model';
import { LeavesService } from '../../entities/leaves/leaves.service';
import { LeavesPopupService } from '../../entities/leaves/leaves-popup.service';
import { LeavesRejectionService } from '../../entities/leaves-rejection/leaves-rejection.service';
import { LeavesRejection } from '../../entities/leaves-rejection/leaves-rejection.model';
import { LeavesSubmissionService } from '../../entities/leaves-submission/leaves-submission.service';

@Component({
    selector: 'jhi-leaves-reject-dialog',
    templateUrl: './my-leaves-reject-dialog.component.html'
})
export class MyLeavesRejectDialogComponent {

    leaves: Leaves;

    constructor(
        private leavesService: LeavesService,
        private leavesRejectionService: LeavesRejectionService,
        private leavesSubmissionService: LeavesSubmissionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmReject(id: number) {
        const leavesRejection = new LeavesRejection();
        leavesRejection.rejected = true;
        leavesRejection.leavesDate = this.leaves.leavesFrom;
        leavesRejection.leavesId = this.leaves.id;
        leavesRejection.userLogin = this.leaves.userLogin;
        leavesRejection.userId = this.leaves.userId;
        this.reject(leavesRejection);
    }

    private reject(leavesRejection: LeavesRejection) {
        this.leavesRejectionService.create(leavesRejection).subscribe((response) => {
            this.leaves.leavesRejectionId = response.body.id;
            const leavesSubmissionId = this.leaves.leavesSubmissionId;
            this.leaves.leavesSubmissionId = null;
            this.leavesService.update(this.leaves).subscribe((res1) => {
                this.leavesSubmissionService.delete(leavesSubmissionId).subscribe((res2) => {
                    this.eventManager.broadcast({
                        name: 'leavesListModification',
                        content: 'Reject'
                    });
                    this.activeModal.dismiss(true);
                }, (res2: HttpErrorResponse) => this.onError(res2.message));
            }, (res1: HttpErrorResponse) => this.onError(res1.message));
        }, (response: HttpErrorResponse) => this.onError(response.message));
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-leaves-reject-popup',
    template: ''
})
export class LeavesRejectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesPopupService: LeavesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leavesPopupService
                .open(MyLeavesRejectDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
