import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LeaveConfig } from './leave-config.model';
import { LeaveConfigService } from './leave-config.service';

@Injectable()
export class LeaveConfigPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private leaveConfigService: LeaveConfigService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.leaveConfigService.find(id)
                    .subscribe((leaveConfigResponse: HttpResponse<LeaveConfig>) => {
                        const leaveConfig: LeaveConfig = leaveConfigResponse.body;
                        leaveConfig.dateCreation = this.datePipe
                            .transform(leaveConfig.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        leaveConfig.dateModification = this.datePipe
                            .transform(leaveConfig.dateModification, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.leaveConfigModalRef(component, leaveConfig);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leaveConfigModalRef(component, new LeaveConfig());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leaveConfigModalRef(component: Component, leaveConfig: LeaveConfig): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.leaveConfig = leaveConfig;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
