import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivityValidation } from './activity-validation.model';
import { ActivityValidationService } from './activity-validation.service';

@Injectable()
export class ActivityValidationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private activityValidationService: ActivityValidationService

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
                this.activityValidationService.find(id)
                    .subscribe((activityValidationResponse: HttpResponse<ActivityValidation>) => {
                        const activityValidation: ActivityValidation = activityValidationResponse.body;
                        activityValidation.dateCreation = this.datePipe
                            .transform(activityValidation.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        activityValidation.dateModification = this.datePipe
                            .transform(activityValidation.dateModification, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.activityValidationModalRef(component, activityValidation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.activityValidationModalRef(component, new ActivityValidation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    activityValidationModalRef(component: Component, activityValidation: ActivityValidation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.activityValidation = activityValidation;
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
