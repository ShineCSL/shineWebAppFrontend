import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeavesSubmission } from './leaves-submission.model';
import { LeavesSubmissionPopupService } from './leaves-submission-popup.service';
import { LeavesSubmissionService } from './leaves-submission.service';
import { Leaves, LeavesService } from '../leaves';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-leaves-submission-dialog',
    templateUrl: './leaves-submission-dialog.component.html'
})
export class LeavesSubmissionDialogComponent implements OnInit {

    leavesSubmission: LeavesSubmission;
    isSaving: boolean;

    leaves: Leaves[];

    users: User[];
    leavesDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leavesSubmissionService: LeavesSubmissionService,
        private leavesService: LeavesService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.leavesService.query()
            .subscribe((res: HttpResponse<Leaves[]>) => { this.leaves = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.leavesSubmission.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leavesSubmissionService.update(this.leavesSubmission));
        } else {
            this.subscribeToSaveResponse(
                this.leavesSubmissionService.create(this.leavesSubmission));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LeavesSubmission>>) {
        result.subscribe((res: HttpResponse<LeavesSubmission>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LeavesSubmission) {
        this.eventManager.broadcast({ name: 'leavesSubmissionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLeavesById(index: number, item: Leaves) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-leaves-submission-popup',
    template: ''
})
export class LeavesSubmissionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesSubmissionPopupService: LeavesSubmissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leavesSubmissionPopupService
                    .open(LeavesSubmissionDialogComponent as Component, params['id']);
            } else {
                this.leavesSubmissionPopupService
                    .open(LeavesSubmissionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
