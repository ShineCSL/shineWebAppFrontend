import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Leaves } from './leaves.model';
import { LeavesPopupService } from './leaves-popup.service';
import { LeavesService } from './leaves.service';
import { User, UserService } from '../../shared';
import { Task, TaskService } from '../task';
import { LeavesSubmission, LeavesSubmissionService } from '../leaves-submission';
import { LeavesValidation, LeavesValidationService } from '../leaves-validation';
import { LeavesRejection, LeavesRejectionService } from '../leaves-rejection';

@Component({
    selector: 'jhi-leaves-dialog',
    templateUrl: './leaves-dialog.component.html'
})
export class LeavesDialogComponent implements OnInit {

    leaves: Leaves;
    isSaving: boolean;

    users: User[];

    tasks: Task[];

    leavessubmissions: LeavesSubmission[];

    leavesvalidations: LeavesValidation[];

    leavesrejections: LeavesRejection[];
    leavesFromDp: any;
    leavesToDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leavesService: LeavesService,
        private userService: UserService,
        private taskService: TaskService,
        private leavesSubmissionService: LeavesSubmissionService,
        private leavesValidationService: LeavesValidationService,
        private leavesRejectionService: LeavesRejectionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.taskService.query()
            .subscribe((res: HttpResponse<Task[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.leavesSubmissionService
            .query({filter: 'leaves-is-null'})
            .subscribe((res: HttpResponse<LeavesSubmission[]>) => {
                if (!this.leaves.leavesSubmissionId) {
                    this.leavessubmissions = res.body;
                } else {
                    this.leavesSubmissionService
                        .find(this.leaves.leavesSubmissionId)
                        .subscribe((subRes: HttpResponse<LeavesSubmission>) => {
                            this.leavessubmissions = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.leavesValidationService
            .query({filter: 'leaves-is-null'})
            .subscribe((res: HttpResponse<LeavesValidation[]>) => {
                if (!this.leaves.leavesValidationId) {
                    this.leavesvalidations = res.body;
                } else {
                    this.leavesValidationService
                        .find(this.leaves.leavesValidationId)
                        .subscribe((subRes: HttpResponse<LeavesValidation>) => {
                            this.leavesvalidations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.leavesRejectionService
            .query({filter: 'leaves-is-null'})
            .subscribe((res: HttpResponse<LeavesRejection[]>) => {
                if (!this.leaves.leavesRejectionId) {
                    this.leavesrejections = res.body;
                } else {
                    this.leavesRejectionService
                        .find(this.leaves.leavesRejectionId)
                        .subscribe((subRes: HttpResponse<LeavesRejection>) => {
                            this.leavesrejections = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.leaves.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leavesService.update(this.leaves));
        } else {
            this.subscribeToSaveResponse(
                this.leavesService.create(this.leaves));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Leaves>>) {
        result.subscribe((res: HttpResponse<Leaves>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Leaves) {
        this.eventManager.broadcast({ name: 'leavesListModification', content: 'OK'});
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

    trackTaskById(index: number, item: Task) {
        return item.id;
    }

    trackLeavesSubmissionById(index: number, item: LeavesSubmission) {
        return item.id;
    }

    trackLeavesValidationById(index: number, item: LeavesValidation) {
        return item.id;
    }

    trackLeavesRejectionById(index: number, item: LeavesRejection) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-leaves-popup',
    template: ''
})
export class LeavesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesPopupService: LeavesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leavesPopupService
                    .open(LeavesDialogComponent as Component, params['id']);
            } else {
                this.leavesPopupService
                    .open(LeavesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
