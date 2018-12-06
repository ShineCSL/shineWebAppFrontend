import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { HomeWebsitePopupService } from './home-website-popup.service';

@Component({
    selector: 'jhi-home-website-dialog',
    templateUrl: './home-website-dialog.component.html'
})
export class HomeWebsiteDialogComponent implements OnInit {


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
    selector: 'jhi-home-website-popup',
    template: ''
})
export class HomeWebsitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private homeWebsitePopupService: HomeWebsitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.homeWebsitePopupService
                    .open(HomeWebsiteDialogComponent as Component, params['id']);
            } else {
                this.homeWebsitePopupService
                    .open(HomeWebsiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
