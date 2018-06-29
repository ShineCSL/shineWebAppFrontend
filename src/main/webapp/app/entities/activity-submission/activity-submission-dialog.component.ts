import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ActivitySubmission } from './activity-submission.model';
import { ActivitySubmissionPopupService } from './activity-submission-popup.service';
import { ActivitySubmissionService } from './activity-submission.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-activity-submission-dialog',
    templateUrl: './activity-submission-dialog.component.html'
})
export class ActivitySubmissionDialogComponent implements OnInit {

    activitySubmission: ActivitySubmission;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private activitySubmissionService: ActivitySubmissionService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.activitySubmission.id !== undefined) {
            this.subscribeToSaveResponse(
                this.activitySubmissionService.update(this.activitySubmission));
        } else {
            this.subscribeToSaveResponse(
                this.activitySubmissionService.create(this.activitySubmission));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ActivitySubmission>>) {
        result.subscribe((res: HttpResponse<ActivitySubmission>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ActivitySubmission) {
        this.eventManager.broadcast({ name: 'activitySubmissionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-activity-submission-popup',
    template: ''
})
export class ActivitySubmissionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activitySubmissionPopupService: ActivitySubmissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.activitySubmissionPopupService
                    .open(ActivitySubmissionDialogComponent as Component, params['id']);
            } else {
                this.activitySubmissionPopupService
                    .open(ActivitySubmissionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
