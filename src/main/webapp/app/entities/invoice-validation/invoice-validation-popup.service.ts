import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InvoiceValidation } from './invoice-validation.model';
import { InvoiceValidationService } from './invoice-validation.service';

@Injectable()
export class InvoiceValidationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
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
                        invoiceValidation.dateCreation = this.datePipe
                            .transform(invoiceValidation.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        invoiceValidation.dateModification = this.datePipe
                            .transform(invoiceValidation.dateModification, 'yyyy-MM-ddTHH:mm:ss');
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
