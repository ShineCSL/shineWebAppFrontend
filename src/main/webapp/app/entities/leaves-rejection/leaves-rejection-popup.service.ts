import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LeavesRejection } from './leaves-rejection.model';
import { LeavesRejectionService } from './leaves-rejection.service';

@Injectable()
export class LeavesRejectionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private leavesRejectionService: LeavesRejectionService

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
                this.leavesRejectionService.find(id)
                    .subscribe((leavesRejectionResponse: HttpResponse<LeavesRejection>) => {
                        const leavesRejection: LeavesRejection = leavesRejectionResponse.body;
                        if (leavesRejection.leavesDate) {
                            leavesRejection.leavesDate = {
                                year: leavesRejection.leavesDate.getFullYear(),
                                month: leavesRejection.leavesDate.getMonth() + 1,
                                day: leavesRejection.leavesDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.leavesRejectionModalRef(component, leavesRejection);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leavesRejectionModalRef(component, new LeavesRejection());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leavesRejectionModalRef(component: Component, leavesRejection: LeavesRejection): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.leavesRejection = leavesRejection;
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
