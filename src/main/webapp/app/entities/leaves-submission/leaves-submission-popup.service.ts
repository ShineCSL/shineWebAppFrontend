import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LeavesSubmission } from './leaves-submission.model';
import { LeavesSubmissionService } from './leaves-submission.service';

@Injectable()
export class LeavesSubmissionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private leavesSubmissionService: LeavesSubmissionService

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
                this.leavesSubmissionService.find(id)
                    .subscribe((leavesSubmissionResponse: HttpResponse<LeavesSubmission>) => {
                        const leavesSubmission: LeavesSubmission = leavesSubmissionResponse.body;
                        if (leavesSubmission.leavesDate) {
                            leavesSubmission.leavesDate = {
                                year: leavesSubmission.leavesDate.getFullYear(),
                                month: leavesSubmission.leavesDate.getMonth() + 1,
                                day: leavesSubmission.leavesDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.leavesSubmissionModalRef(component, leavesSubmission);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leavesSubmissionModalRef(component, new LeavesSubmission());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leavesSubmissionModalRef(component: Component, leavesSubmission: LeavesSubmission): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.leavesSubmission = leavesSubmission;
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
