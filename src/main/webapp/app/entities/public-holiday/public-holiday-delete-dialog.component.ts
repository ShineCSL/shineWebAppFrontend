import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PublicHoliday } from './public-holiday.model';
import { PublicHolidayPopupService } from './public-holiday-popup.service';
import { PublicHolidayService } from './public-holiday.service';

@Component({
    selector: 'jhi-public-holiday-delete-dialog',
    templateUrl: './public-holiday-delete-dialog.component.html'
})
export class PublicHolidayDeleteDialogComponent {

    publicHoliday: PublicHoliday;

    constructor(
        private publicHolidayService: PublicHolidayService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.publicHolidayService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'publicHolidayListModification',
                content: 'Deleted an publicHoliday'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-public-holiday-delete-popup',
    template: ''
})
export class PublicHolidayDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private publicHolidayPopupService: PublicHolidayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.publicHolidayPopupService
                .open(PublicHolidayDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
