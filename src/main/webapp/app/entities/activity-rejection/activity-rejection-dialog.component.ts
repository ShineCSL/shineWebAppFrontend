import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ActivityRejection } from './activity-rejection.model';
import { ActivityRejectionPopupService } from './activity-rejection-popup.service';
import { ActivityRejectionService } from './activity-rejection.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-activity-rejection-dialog',
    templateUrl: './activity-rejection-dialog.component.html'
})
export class ActivityRejectionDialogComponent implements OnInit {

    activityRejection: ActivityRejection;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private activityRejectionService: ActivityRejectionService,
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
        if (this.activityRejection.id !== undefined) {
            this.subscribeToSaveResponse(
                this.activityRejectionService.update(this.activityRejection));
        } else {
            this.subscribeToSaveResponse(
                this.activityRejectionService.create(this.activityRejection));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ActivityRejection>>) {
        result.subscribe((res: HttpResponse<ActivityRejection>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ActivityRejection) {
        this.eventManager.broadcast({ name: 'activityRejectionListModification', content: 'OK'});
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
    selector: 'jhi-activity-rejection-popup',
    template: ''
})
export class ActivityRejectionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activityRejectionPopupService: ActivityRejectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.activityRejectionPopupService
                    .open(ActivityRejectionDialogComponent as Component, params['id']);
            } else {
                this.activityRejectionPopupService
                    .open(ActivityRejectionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
