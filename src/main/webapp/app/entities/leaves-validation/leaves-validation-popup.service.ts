import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LeavesValidation } from './leaves-validation.model';
import { LeavesValidationService } from './leaves-validation.service';

@Injectable()
export class LeavesValidationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private leavesValidationService: LeavesValidationService

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
                this.leavesValidationService.find(id)
                    .subscribe((leavesValidationResponse: HttpResponse<LeavesValidation>) => {
                        const leavesValidation: LeavesValidation = leavesValidationResponse.body;
                        leavesValidation.dateModification = this.datePipe
                            .transform(leavesValidation.dateModification, 'yyyy-MM-ddTHH:mm:ss');
                        leavesValidation.dateCreation = this.datePipe
                            .transform(leavesValidation.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.leavesValidationModalRef(component, leavesValidation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leavesValidationModalRef(component, new LeavesValidation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leavesValidationModalRef(component: Component, leavesValidation: LeavesValidation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.leavesValidation = leavesValidation;
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
