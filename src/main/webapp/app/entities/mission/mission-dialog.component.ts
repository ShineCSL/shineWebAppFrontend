import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Mission } from './mission.model';
import { MissionPopupService } from './mission-popup.service';
import { MissionService } from './mission.service';
import { Client, ClientService } from '../client';

@Component({
    selector: 'jhi-mission-dialog',
    templateUrl: './mission-dialog.component.html'
})
export class MissionDialogComponent implements OnInit {

    mission: Mission;
    isSaving: boolean;

    clients: Client[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private missionService: MissionService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mission.id !== undefined) {
            this.subscribeToSaveResponse(
                this.missionService.update(this.mission));
        } else {
            this.subscribeToSaveResponse(
                this.missionService.create(this.mission));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Mission>>) {
        result.subscribe((res: HttpResponse<Mission>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Mission) {
        this.eventManager.broadcast({ name: 'missionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mission-popup',
    template: ''
})
export class MissionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private missionPopupService: MissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.missionPopupService
                    .open(MissionDialogComponent as Component, params['id']);
            } else {
                this.missionPopupService
                    .open(MissionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
