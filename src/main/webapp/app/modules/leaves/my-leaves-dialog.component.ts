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
import { User, UserService, Account, Principal, DateUserUtils } from '../../shared';

import { TranslateService } from '@ngx-translate/core';

import { JhiDateUtils } from 'ng-jhipster';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as _moment from 'moment';

@Component({
    selector: 'jhi-leaves-dialog',
    templateUrl: './my-leaves-dialog.component.html'
})
export class MyLeavesDialogComponent implements OnInit {

    leaveTakenError: boolean;
    leaves: Leaves;
    user: User;
    account: Account;
    isSaving: boolean;
    moment: _moment.Moment = _moment();

    tasks: Task[] = [];

    leavesFromDp: any;
    leavesToDp: any;

    leavesFullDayChecked = true;

    filter: string;
    orderTask: string;
    language: string;
    reverse: string;

    leavesTaken: Leaves[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leavesService: LeavesService,
        private userService: UserService,
        private taskService: TaskService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private dateUtils: JhiDateUtils,
        private dateUser: DateUserUtils,
        private translateService: TranslateService
    ) {
        this.filter = '';
        this.orderTask = '';
        this.reverse = 'asc';
        this.markCalendarDisabled = this.markCalendarDisabled.bind(this);
    }

    ngOnInit() {
        this.isSaving = false;
        this.leaveTakenError = false;
        this.leaves.fullDay = true;
        this.principal.identity().then((account) => {
            this.account = account;
            this.userService.find(this.account.login).subscribe((response) => {
                this.user = response.body;
            });
        });
        this.language = this.translateService.currentLang;
        this.taskService.query()
            .subscribe((res: HttpResponse<Task[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.leavesService.query().subscribe((res: HttpResponse<Leaves[]>) => this.leavesTaken = res.body);
    }

    clear() {
        this.leaveTakenError = false;
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.existLeaveTakenInRange(this.leaves.leavesFrom, this.leaves.leavesTo)) {
            this.leaveTakenError = true;
            this.onSaveError();
        } else {
            this.leaveTakenError = false;
            this.dateUser.setDateUser(this.leaves, this.leaves.leavesFrom);
            if (this.leaves.id !== undefined) {
                this.subscribeToSaveResponse(
                    this.leavesService.update(this.leaves));
            } else {
                this.subscribeToSaveResponse(
                    this.leavesService.create(this.leaves));
            }
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

    isleavesFullDayChecked(e) {
        if (e.target.checked) {
            this.leavesFullDayChecked = true;
            if (this.leaves.leavesFrom) {
                this.setLeavesTo(this.leaves.leavesFrom);
            }
        } else {
            this.leavesFullDayChecked = false;
            this.leaves.nbOfHours = null;
            if (this.leaves.leavesFrom) {
                this.setLeavesTo(this.leaves.leavesFrom);
            }
        }
     }

    setLeavesTo(e) {
        this.leaves.leavesTo = e;
        if (this.leavesFullDayChecked) {
            this.leaves.nbOfHours = 8;
        }
    }

    setNbOfHours(e) {
        if (this.leavesFullDayChecked) {
            this.leaves.nbOfHours = this.dateUser.getBusinessDaysBetweenDates(this.leaves.leavesFrom, e) * 8;
        }
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return this.dateUser.isWeekend(d);
    }

    isHoliday(date: NgbDateStruct) {
      const d = new Date(date.year, date.month - 1, date.day);
      return this.dateUser.isHoliday(d);
    }

    isCalendarLeaveTaken(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return this.isLeaveTaken(d);
    }

    isLeaveTaken(date: Date) {
        let leaveTaken = false;
        this.leavesTaken.forEach((item) => {
            if (item.leavesFrom <= date && item.leavesTo >= date) {
                leaveTaken = true;
            }
        });
        return leaveTaken;
    }

    existLeaveTakenInRange(from, to) {
        let existLeaveTaken = false;
        console.log(from);
        console.log(to);
        const dateFrom = new Date(from.year, from.month - 1, from.day);
        const dateTo = new Date(to.year, to.month - 1, to.day);
        console.log(dateFrom.toLocaleDateString());
        console.log(dateFrom.getDay());

        console.log(dateTo.toLocaleDateString());
        this.leavesTaken.forEach((item) => {
            if (this.dateUser.isDateRangesOverlap(dateFrom, dateTo, item.leavesFrom, item.leavesTo)) {
                existLeaveTaken = true;
            }
        });
        return existLeaveTaken;
    }

    markCalendarDisabled(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        if (d.getDay() === 0 || d.getDay() === 6 || this.isHoliday(date) || this.isCalendarLeaveTaken(date)) {
            return date.day;
        }
        return null;
    }

    getCalendarTooltip(date: NgbDateStruct) {
        return this.dateUser.getCalendarHolidayTooltip(date);
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
                    .open(MyLeavesDialogComponent as Component, params['id']);
            } else {
                this.leavesPopupService
                    .open(MyLeavesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
