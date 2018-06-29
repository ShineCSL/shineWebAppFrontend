import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AccountDetails } from './account-details.model';
import { AccountDetailsService } from './account-details.service';

@Injectable()
export class AccountDetailsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private accountDetailsService: AccountDetailsService

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
                this.accountDetailsService.find(id)
                    .subscribe((accountDetailsResponse: HttpResponse<AccountDetails>) => {
                        const accountDetails: AccountDetails = accountDetailsResponse.body;
                        accountDetails.dateCreation = this.datePipe
                            .transform(accountDetails.dateCreation, 'yyyy-MM-ddTHH:mm:ss');
                        accountDetails.dateModification = this.datePipe
                            .transform(accountDetails.dateModification, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.accountDetailsModalRef(component, accountDetails);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accountDetailsModalRef(component, new AccountDetails());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accountDetailsModalRef(component: Component, accountDetails: AccountDetails): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accountDetails = accountDetails;
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
