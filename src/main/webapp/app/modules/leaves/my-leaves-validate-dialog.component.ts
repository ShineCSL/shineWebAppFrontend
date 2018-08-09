import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Leaves } from '../../entities/leaves/leaves.model';
import { LeavesService } from '../../entities/leaves/leaves.service';
import { LeavesPopupService } from '../../entities/leaves/leaves-popup.service';
import { LeavesValidationService } from '../../entities/leaves-validation/leaves-validation.service';
import { LeavesValidation } from '../../entities/leaves-validation/leaves-validation.model';

@Component({
    selector: 'jhi-leaves-validate-dialog',
    templateUrl: './my-leaves-validate-dialog.component.html'
})
export class MyLeavesValidateDialogComponent {

    leaves: Leaves;

    constructor(
        private leavesService: LeavesService,
        private leavesValidationService: LeavesValidationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmValidate(id: number) {
        let leavesValidation = new LeavesValidation();
        leavesValidation.validated = true;
        leavesValidation.leavesDate = this.leaves.leavesFrom;
        leavesValidation.leavesId = this.leaves.id;
        leavesValidation.userLogin = this.leaves.userLogin;
        leavesValidation.userId = this.leaves.userId;
        this.leavesValidationService.create(leavesValidation).subscribe((response) => {
            this.leaves.leavesValidationId = response.body.id;
            this.leavesService.update(this.leaves).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'leavesListModification',
                    content: 'Validate'
                });
                this.activeModal.dismiss(true);
            }, (res: HttpErrorResponse) => this.onError(res.message));
        }, (res: HttpErrorResponse) => this.onError(res.message));
    }
    
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-leaves-validate-popup',
    template: ''
})
export class LeavesValidatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leavesPopupService: LeavesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leavesPopupService
                .open(MyLeavesValidateDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
