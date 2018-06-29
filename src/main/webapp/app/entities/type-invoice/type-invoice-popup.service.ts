import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TypeInvoice } from './type-invoice.model';
import { TypeInvoiceService } from './type-invoice.service';

@Injectable()
export class TypeInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private typeInvoiceService: TypeInvoiceService

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
                this.typeInvoiceService.find(id)
                    .subscribe((typeInvoiceResponse: HttpResponse<TypeInvoice>) => {
                        const typeInvoice: TypeInvoice = typeInvoiceResponse.body;
                        typeInvoice.dateModification = this.datePipe
                            .transform(typeInvoice.dateModification, 'yyyy-MM-ddTHH:mm:ss');
                        typeInvoice.dateCreation = this.datePipe
                            .transform(typeInvoice.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.typeInvoiceModalRef(component, typeInvoice);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.typeInvoiceModalRef(component, new TypeInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    typeInvoiceModalRef(component: Component, typeInvoice: TypeInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.typeInvoice = typeInvoice;
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
