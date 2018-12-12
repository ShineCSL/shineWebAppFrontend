import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { HomeResourcePopupService } from './home-resource-popup.service';

@Component({
    selector: 'jhi-home-resource-dialog',
    templateUrl: './home-resource-dialog.component.html',
    styleUrls: [
        'home-resource-dialog.scss'
    ]
})
export class HomeResourceDialogComponent implements OnInit {


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
    selector: 'jhi-home-resource-popup',
    template: ''
})
export class HomeResourcePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private homeResourcePopupService: HomeResourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.homeResourcePopupService
                    .open(HomeResourceDialogComponent as Component, params['id']);
            } else {
                this.homeResourcePopupService
                    .open(HomeResourceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
