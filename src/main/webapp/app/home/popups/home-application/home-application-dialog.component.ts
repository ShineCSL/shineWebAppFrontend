import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { HomeApplicationPopupService } from './home-application-popup.service';

@Component({
    selector: 'jhi-home-application-dialog',
    templateUrl: './home-application-dialog.component.html',
    styleUrls: [
        'home-application-dialog.scss'
    ]
})
export class HomeApplicationDialogComponent implements OnInit {


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private router: Router
    ) {
    }

    ngOnInit() {

    }

    clear() {
        this.activeModal.dismiss(true);
    }
}

@Component({
    selector: 'jhi-home-application-popup',
    template: ''
})
export class HomeApplicationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private homeApplicationPopupService: HomeApplicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.homeApplicationPopupService
                    .open(HomeApplicationDialogComponent as Component, params['id']);
            } else {
                this.homeApplicationPopupService
                    .open(HomeApplicationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
