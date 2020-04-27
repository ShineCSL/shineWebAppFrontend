import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PublicHoliday } from './public-holiday.model';
import { PublicHolidayService } from './public-holiday.service';

@Injectable()
export class PublicHolidayPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private publicHolidayService: PublicHolidayService

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
                this.publicHolidayService.find(id)
                    .subscribe((publicHolidayResponse: HttpResponse<PublicHoliday>) => {
                        const publicHoliday: PublicHoliday = publicHolidayResponse.body;
                        if (publicHoliday.dateHoliday) {
                            publicHoliday.dateHoliday = {
                                year: publicHoliday.dateHoliday.getFullYear(),
                                month: publicHoliday.dateHoliday.getMonth() + 1,
                                day: publicHoliday.dateHoliday.getDate()
                            };
                        }
                        this.ngbModalRef = this.publicHolidayModalRef(component, publicHoliday);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.publicHolidayModalRef(component, new PublicHoliday());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    publicHolidayModalRef(component: Component, publicHoliday: PublicHoliday): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.publicHoliday = publicHoliday;
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
