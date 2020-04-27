import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ActivityConfig } from './activity-config.model';
import { ActivityConfigPopupService } from './activity-config-popup.service';
import { ActivityConfigService } from './activity-config.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-activity-config-dialog',
    templateUrl: './activity-config-dialog.component.html'
})
export class ActivityConfigDialogComponent implements OnInit {

    activityConfig: ActivityConfig;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private activityConfigService: ActivityConfigService,
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
        if (this.activityConfig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.activityConfigService.update(this.activityConfig));
        } else {
            this.subscribeToSaveResponse(
                this.activityConfigService.create(this.activityConfig));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ActivityConfig>>) {
        result.subscribe((res: HttpResponse<ActivityConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ActivityConfig) {
        this.eventManager.broadcast({ name: 'activityConfigListModification', content: 'OK'});
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
    selector: 'jhi-activity-config-popup',
    template: ''
})
export class ActivityConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activityConfigPopupService: ActivityConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.activityConfigPopupService
                    .open(ActivityConfigDialogComponent as Component, params['id']);
            } else {
                this.activityConfigPopupService
                    .open(ActivityConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
