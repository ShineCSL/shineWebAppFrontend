import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ActivityRejection } from './activity-rejection.model';
import { ActivityRejectionService } from './activity-rejection.service';

@Injectable()
export class ActivityRejectionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private activityRejectionService: ActivityRejectionService

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
                this.activityRejectionService.find(id)
                    .subscribe((activityRejectionResponse: HttpResponse<ActivityRejection>) => {
                        const activityRejection: ActivityRejection = activityRejectionResponse.body;
                        this.ngbModalRef = this.activityRejectionModalRef(component, activityRejection);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.activityRejectionModalRef(component, new ActivityRejection());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    activityRejectionModalRef(component: Component, activityRejection: ActivityRejection): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.activityRejection = activityRejection;
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
