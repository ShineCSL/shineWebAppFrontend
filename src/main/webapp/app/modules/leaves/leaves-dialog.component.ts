import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Leaves } from '../../entities/leaves/leaves.model';
import { LeavesService } from '../../entities/leaves/leaves.service';
import { LeavesPopupService } from '../../entities/leaves/leaves-popup.service';
import { Task, TaskService } from '../../entities/task';
import { User, UserService } from '../../shared';
import { Account, Principal } from '../../shared';

import * as _moment from 'moment';

@Component({
    selector: 'jhi-leaves-dialog',
    templateUrl: './leaves-dialog.component.html'
})
export class LeavesDialogComponent implements OnInit {

    leaves: Leaves;
    user: User;
    account: Account;
    isSaving: boolean;
    moment: _moment.Moment = _moment();

    tasks: Task[];

    leaveDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leavesService: LeavesService,
        private userService: UserService,
        private taskService: TaskService,
        private eventManager: JhiEventManager,
        private principal: Principal,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then((account) => {
            this.account = account;
            this.userService.find(this.account.login).subscribe((response) => {
                this.user = response.body;
            });
        });
        this.taskService.query()
            .subscribe((res: HttpResponse<Task[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        var now = new Date();
        var day = now.getDay();
        var week = this.moment.format('W');
        var year = now.getFullYear();
        this.leaves.day = day;
        this.leaves.weekNumber = +week;
        this.leaves.year = year;
        alert('day: ' + day);
        alert('week: ' + week);
        alert('year: ' + year);
        alert('userID: ' + this.user.id);
        this.leaves.userId = this.user.id;
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

    trackTaskById(index: number, item: Task) {
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
