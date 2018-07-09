import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Leaves } from './leaves.model';
import { LeavesService } from './leaves.service';

@Injectable()
export class LeavesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private leavesService: LeavesService

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
                this.leavesService.find(id)
                    .subscribe((leavesResponse: HttpResponse<Leaves>) => {
                        const leaves: Leaves = leavesResponse.body;
                        if (leaves.leaveDate) {
                            leaves.leaveDate = {
                                year: leaves.leaveDate.getFullYear(),
                                month: leaves.leaveDate.getMonth() + 1,
                                day: leaves.leaveDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.leavesModalRef(component, leaves);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leavesModalRef(component, new Leaves());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leavesModalRef(component: Component, leaves: Leaves): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.leaves = leaves;
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
