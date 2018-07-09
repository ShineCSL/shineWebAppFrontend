import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { InvoiceSubmission } from './invoice-submission.model';
import { InvoiceSubmissionService } from './invoice-submission.service';

@Injectable()
export class InvoiceSubmissionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private invoiceSubmissionService: InvoiceSubmissionService

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
                this.invoiceSubmissionService.find(id)
                    .subscribe((invoiceSubmissionResponse: HttpResponse<InvoiceSubmission>) => {
                        const invoiceSubmission: InvoiceSubmission = invoiceSubmissionResponse.body;
                        if (invoiceSubmission.dateInvoice) {
                            invoiceSubmission.dateInvoice = {
                                year: invoiceSubmission.dateInvoice.getFullYear(),
                                month: invoiceSubmission.dateInvoice.getMonth() + 1,
                                day: invoiceSubmission.dateInvoice.getDate()
                            };
                        }
                        this.ngbModalRef = this.invoiceSubmissionModalRef(component, invoiceSubmission);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceSubmissionModalRef(component, new InvoiceSubmission());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceSubmissionModalRef(component: Component, invoiceSubmission: InvoiceSubmission): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoiceSubmission = invoiceSubmission;
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
