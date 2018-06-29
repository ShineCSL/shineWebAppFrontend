import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivitySubmission } from './activity-submission.model';
import { ActivitySubmissionService } from './activity-submission.service';

@Injectable()
export class ActivitySubmissionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private activitySubmissionService: ActivitySubmissionService

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
                this.activitySubmissionService.find(id)
                    .subscribe((activitySubmissionResponse: HttpResponse<ActivitySubmission>) => {
                        const activitySubmission: ActivitySubmission = activitySubmissionResponse.body;
                        activitySubmission.dateCreation = this.datePipe
                            .transform(activitySubmission.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        activitySubmission.dateModification = this.datePipe
                            .transform(activitySubmission.dateModification, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.activitySubmissionModalRef(component, activitySubmission);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.activitySubmissionModalRef(component, new ActivitySubmission());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    activitySubmissionModalRef(component: Component, activitySubmission: ActivitySubmission): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.activitySubmission = activitySubmission;
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
