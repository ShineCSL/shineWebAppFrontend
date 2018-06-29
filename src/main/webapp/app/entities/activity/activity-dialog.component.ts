import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Activity } from './activity.model';
import { ActivityPopupService } from './activity-popup.service';
import { ActivityService } from './activity.service';
import { Task, TaskService } from '../task';
import { User, UserService } from '../../shared';
import { ActivitySubmission, ActivitySubmissionService } from '../activity-submission';
import { ActivityValidation, ActivityValidationService } from '../activity-validation';
import { ActivityRejection, ActivityRejectionService } from '../activity-rejection';
import { Mission, MissionService } from '../mission';

@Component({
    selector: 'jhi-activity-dialog',
    templateUrl: './activity-dialog.component.html'
})
export class ActivityDialogComponent implements OnInit {

    activity: Activity;
    isSaving: boolean;

    tasks: Task[];

    users: User[];

    activitysubmissions: ActivitySubmission[];

    activityvalidations: ActivityValidation[];

    activityrejections: ActivityRejection[];

    missions: Mission[];
    activityDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private activityService: ActivityService,
        private taskService: TaskService,
        private userService: UserService,
        private activitySubmissionService: ActivitySubmissionService,
        private activityValidationService: ActivityValidationService,
        private activityRejectionService: ActivityRejectionService,
        private missionService: MissionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.taskService.query()
            .subscribe((res: HttpResponse<Task[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.activitySubmissionService.query()
            .subscribe((res: HttpResponse<ActivitySubmission[]>) => { this.activitysubmissions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.activityValidationService.query()
            .subscribe((res: HttpResponse<ActivityValidation[]>) => { this.activityvalidations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.activityRejectionService.query()
            .subscribe((res: HttpResponse<ActivityRejection[]>) => { this.activityrejections = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.missionService.query()
            .subscribe((res: HttpResponse<Mission[]>) => { this.missions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.activity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.activityService.update(this.activity));
        } else {
            this.subscribeToSaveResponse(
                this.activityService.create(this.activity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Activity>>) {
        result.subscribe((res: HttpResponse<Activity>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Activity) {
        this.eventManager.broadcast({ name: 'activityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTaskById(index: number, item: Task) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackActivitySubmissionById(index: number, item: ActivitySubmission) {
        return item.id;
    }

    trackActivityValidationById(index: number, item: ActivityValidation) {
        return item.id;
    }

    trackActivityRejectionById(index: number, item: ActivityRejection) {
        return item.id;
    }

    trackMissionById(index: number, item: Mission) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-activity-popup',
    template: ''
})
export class ActivityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activityPopupService: ActivityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.activityPopupService
                    .open(ActivityDialogComponent as Component, params['id']);
            } else {
                this.activityPopupService
                    .open(ActivityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
