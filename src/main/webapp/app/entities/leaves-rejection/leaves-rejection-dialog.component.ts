import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeavesRejection } from './leaves-rejection.model';
import { LeavesRejectionPopupService } from './leaves-rejection-popup.service';
import { LeavesRejectionService } from './leaves-rejection.service';
import { Leaves, LeavesService } from '../leaves';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-leaves-rejection-dialog',
    templateUrl: './leaves-rejection-dialog.component.html'
})
export class LeavesRejectionDialogComponent implements OnInit {

    leavesRejection: LeavesRejection;
    isSaving: boolean;

    leaves: Leaves[];

    users: User[];
    leavesDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leavesRejectionService: LeavesRejectionService,
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
        if (this.leavesRejection.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leavesRejectionService.update(this.leavesRejection));
        } else {
            this.subscribeToSaveResponse(
                this.leavesRejectionService.create(this.leavesRejection));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LeavesRejection>>) {
        result.subscribe((res: HttpResponse<LeavesRejection>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LeavesRejection) {
        this.eventManager.broadcast({ name: 'leavesRejectionListModification', content: 'OK'});
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
    selector: 'jhi-leaves-rejection-popup',
    template: ''
})
export class LeavesRejectionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesRejectionPopupService: LeavesRejectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leavesRejectionPopupService
                    .open(LeavesRejectionDialogComponent as Component, params['id']);
            } else {
                this.leavesRejectionPopupService
                    .open(LeavesRejectionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
