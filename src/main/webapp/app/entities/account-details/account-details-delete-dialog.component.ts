import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountDetails } from './account-details.model';
import { AccountDetailsPopupService } from './account-details-popup.service';
import { AccountDetailsService } from './account-details.service';

@Component({
    selector: 'jhi-account-details-delete-dialog',
    templateUrl: './account-details-delete-dialog.component.html'
})
export class AccountDetailsDeleteDialogComponent {

    accountDetails: AccountDetails;

    constructor(
        private accountDetailsService: AccountDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'accountDetailsListModification',
                content: 'Deleted an accountDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-account-details-delete-popup',
    template: ''
})
export class AccountDetailsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountDetailsPopupService: AccountDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accountDetailsPopupService
                .open(AccountDetailsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
