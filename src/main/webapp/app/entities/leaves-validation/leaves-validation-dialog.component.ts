import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeavesValidation } from './leaves-validation.model';
import { LeavesValidationPopupService } from './leaves-validation-popup.service';
import { LeavesValidationService } from './leaves-validation.service';
import { Leaves, LeavesService } from '../leaves';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-leaves-validation-dialog',
    templateUrl: './leaves-validation-dialog.component.html'
})
export class LeavesValidationDialogComponent implements OnInit {

    leavesValidation: LeavesValidation;
    isSaving: boolean;

    leaves: Leaves[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leavesValidationService: LeavesValidationService,
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
        if (this.leavesValidation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leavesValidationService.update(this.leavesValidation));
        } else {
            this.subscribeToSaveResponse(
                this.leavesValidationService.create(this.leavesValidation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LeavesValidation>>) {
        result.subscribe((res: HttpResponse<LeavesValidation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LeavesValidation) {
        this.eventManager.broadcast({ name: 'leavesValidationListModification', content: 'OK'});
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
    selector: 'jhi-leaves-validation-popup',
    template: ''
})
export class LeavesValidationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesValidationPopupService: LeavesValidationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leavesValidationPopupService
                    .open(LeavesValidationDialogComponent as Component, params['id']);
            } else {
                this.leavesValidationPopupService
                    .open(LeavesValidationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
