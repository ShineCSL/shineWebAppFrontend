import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { InvoiceValidation } from './invoice-validation.model';
import { InvoiceValidationService } from './invoice-validation.service';

@Injectable()
export class InvoiceValidationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private invoiceValidationService: InvoiceValidationService

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
                this.invoiceValidationService.find(id)
                    .subscribe((invoiceValidationResponse: HttpResponse<InvoiceValidation>) => {
                        const invoiceValidation: InvoiceValidation = invoiceValidationResponse.body;
                        if (invoiceValidation.dateInvoice) {
                            invoiceValidation.dateInvoice = {
                                year: invoiceValidation.dateInvoice.getFullYear(),
                                month: invoiceValidation.dateInvoice.getMonth() + 1,
                                day: invoiceValidation.dateInvoice.getDate()
                            };
                        }
                        this.ngbModalRef = this.invoiceValidationModalRef(component, invoiceValidation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceValidationModalRef(component, new InvoiceValidation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceValidationModalRef(component: Component, invoiceValidation: InvoiceValidation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoiceValidation = invoiceValidation;
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
