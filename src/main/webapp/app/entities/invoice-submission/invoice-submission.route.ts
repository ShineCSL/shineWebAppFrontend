import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceSubmissionComponent } from './invoice-submission.component';
import { InvoiceSubmissionDetailComponent } from './invoice-submission-detail.component';
import { InvoiceSubmissionPopupComponent } from './invoice-submission-dialog.component';
import { InvoiceSubmissionDeletePopupComponent } from './invoice-submission-delete-dialog.component';

@Injectable()
export class InvoiceSubmissionResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const invoiceSubmissionRoute: Routes = [
    {
        path: 'invoice-submission',
        component: InvoiceSubmissionComponent,
        resolve: {
            'pagingParams': InvoiceSubmissionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceSubmission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-submission/:id',
        component: InvoiceSubmissionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceSubmission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceSubmissionPopupRoute: Routes = [
    {
        path: 'invoice-submission-new',
        component: InvoiceSubmissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceSubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-submission/:id/edit',
        component: InvoiceSubmissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceSubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-submission/:id/delete',
        component: InvoiceSubmissionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceSubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
