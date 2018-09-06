import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Leaves } from '../../entities/leaves/leaves.model';
import { LeavesService } from '../../entities/leaves/leaves.service';
import { LeavesPopupService } from '../../entities/leaves/leaves-popup.service';
import { LeavesSubmissionService } from '../../entities/leaves-submission/leaves-submission.service';
import { LeavesSubmission } from '../../entities/leaves-submission/leaves-submission.model';
import { LeavesRejectionService } from '../../entities/leaves-rejection/leaves-rejection.service';

@Component({
    selector: 'jhi-leaves-submit-dialog',
    templateUrl: './my-leaves-submit-dialog.component.html'
})
export class MyLeavesSubmitDialogComponent {

    leaves: Leaves;

    constructor(
        private leavesService: LeavesService,
        private leavesSubmissionService: LeavesSubmissionService,
        private leavesRejectionService: LeavesRejectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmSubmit(id: number) {
        const leavesSubmission = new LeavesSubmission();
        leavesSubmission.submitted = true;
        leavesSubmission.leavesDate = this.leaves.leavesFrom;
        leavesSubmission.leavesId = this.leaves.id;
        leavesSubmission.userLogin = this.leaves.userLogin;
        leavesSubmission.userId = this.leaves.userId;
        this.submit(leavesSubmission);
    }

    private submit(leavesSubmission: LeavesSubmission) {
        this.leavesSubmissionService.create(leavesSubmission).subscribe((response) => {
            this.leaves.leavesSubmissionId = response.body.id;
            const leavesRejectionId = this.leaves.leavesRejectionId;
            this.leaves.leavesRejectionId = null;
            this.leavesService.update(this.leaves).subscribe((res1) => {
                if (leavesRejectionId) {
                    this.leavesRejectionService.delete(leavesRejectionId).subscribe((res2) => {
                        this.eventManager.broadcast({
                            name: 'leavesListModification',
                            content: 'Submit'
                        });
                        this.activeModal.dismiss(true);
                    }, (res2: HttpErrorResponse) => this.onError(res2.message));
                } else {
                    this.eventManager.broadcast({
                        name: 'leavesListModification',
                        content: 'Submit'
                    });
                    this.activeModal.dismiss(true);
                }
            }, (res1: HttpErrorResponse) => this.onError(res1.message));
        }, (response: HttpErrorResponse) => this.onError(response.message));
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-leaves-submit-popup',
    template: ''
})
export class LeavesSubmitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesPopupService: LeavesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leavesPopupService
                .open(MyLeavesSubmitDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
