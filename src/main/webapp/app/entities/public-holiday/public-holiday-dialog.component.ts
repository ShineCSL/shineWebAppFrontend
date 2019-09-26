import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PublicHoliday } from './public-holiday.model';
import { PublicHolidayPopupService } from './public-holiday-popup.service';
import { PublicHolidayService } from './public-holiday.service';

import { DateUserUtils } from '../../shared';

@Component({
    selector: 'jhi-public-holiday-dialog',
    templateUrl: './public-holiday-dialog.component.html'
})
export class PublicHolidayDialogComponent implements OnInit {

    publicHoliday: PublicHoliday;
    isSaving: boolean;
    dateHolidayDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private publicHolidayService: PublicHolidayService,
        private eventManager: JhiEventManager,
        private dateUser: DateUserUtils,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.dateUser.setDateUser(this.publicHoliday, this.publicHoliday.dateHoliday);
        if (this.publicHoliday.id !== undefined) {
            this.subscribeToSaveResponse(
                this.publicHolidayService.update(this.publicHoliday));
        } else {
            this.subscribeToSaveResponse(
                this.publicHolidayService.create(this.publicHoliday));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PublicHoliday>>) {
        result.subscribe((res: HttpResponse<PublicHoliday>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PublicHoliday) {
        this.eventManager.broadcast({ name: 'publicHolidayListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-public-holiday-popup',
    template: ''
})
export class PublicHolidayPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publicHolidayPopupService: PublicHolidayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.publicHolidayPopupService
                    .open(PublicHolidayDialogComponent as Component, params['id']);
            } else {
                this.publicHolidayPopupService
                    .open(PublicHolidayDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
