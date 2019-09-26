import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeaveConfig } from './leave-config.model';
import { LeaveConfigPopupService } from './leave-config-popup.service';
import { LeaveConfigService } from './leave-config.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-leave-config-dialog',
    templateUrl: './leave-config-dialog.component.html'
})
export class LeaveConfigDialogComponent implements OnInit {

    leaveConfig: LeaveConfig;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leaveConfigService: LeaveConfigService,
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
        if (this.leaveConfig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leaveConfigService.update(this.leaveConfig));
        } else {
            this.subscribeToSaveResponse(
                this.leaveConfigService.create(this.leaveConfig));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LeaveConfig>>) {
        result.subscribe((res: HttpResponse<LeaveConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LeaveConfig) {
        this.eventManager.broadcast({ name: 'leaveConfigListModification', content: 'OK'});
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
    selector: 'jhi-leave-config-popup',
    template: ''
})
export class LeaveConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leaveConfigPopupService: LeaveConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leaveConfigPopupService
                    .open(LeaveConfigDialogComponent as Component, params['id']);
            } else {
                this.leaveConfigPopupService
                    .open(LeaveConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
