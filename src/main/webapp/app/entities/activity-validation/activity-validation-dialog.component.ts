import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ActivityValidation } from './activity-validation.model';
import { ActivityValidationPopupService } from './activity-validation-popup.service';
import { ActivityValidationService } from './activity-validation.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-activity-validation-dialog',
    templateUrl: './activity-validation-dialog.component.html'
})
export class ActivityValidationDialogComponent implements OnInit {

    activityValidation: ActivityValidation;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private activityValidationService: ActivityValidationService,
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
        if (this.activityValidation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.activityValidationService.update(this.activityValidation));
        } else {
            this.subscribeToSaveResponse(
                this.activityValidationService.create(this.activityValidation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ActivityValidation>>) {
        result.subscribe((res: HttpResponse<ActivityValidation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ActivityValidation) {
        this.eventManager.broadcast({ name: 'activityValidationListModification', content: 'OK'});
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
    selector: 'jhi-activity-validation-popup',
    template: ''
})
export class ActivityValidationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activityValidationPopupService: ActivityValidationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.activityValidationPopupService
                    .open(ActivityValidationDialogComponent as Component, params['id']);
            } else {
                this.activityValidationPopupService
                    .open(ActivityValidationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
