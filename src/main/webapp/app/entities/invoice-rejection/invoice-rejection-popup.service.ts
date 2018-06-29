import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InvoiceRejection } from './invoice-rejection.model';
import { InvoiceRejectionService } from './invoice-rejection.service';

@Injectable()
export class InvoiceRejectionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private invoiceRejectionService: InvoiceRejectionService

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
                this.invoiceRejectionService.find(id)
                    .subscribe((invoiceRejectionResponse: HttpResponse<InvoiceRejection>) => {
                        const invoiceRejection: InvoiceRejection = invoiceRejectionResponse.body;
                        invoiceRejection.dateCreation = this.datePipe
                            .transform(invoiceRejection.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        invoiceRejection.dateModification = this.datePipe
                            .transform(invoiceRejection.dateModification, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.invoiceRejectionModalRef(component, invoiceRejection);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceRejectionModalRef(component, new InvoiceRejection());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceRejectionModalRef(component: Component, invoiceRejection: InvoiceRejection): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoiceRejection = invoiceRejection;
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
