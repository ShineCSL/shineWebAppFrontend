import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceRejectionComponent } from './invoice-rejection.component';
import { InvoiceRejectionDetailComponent } from './invoice-rejection-detail.component';
import { InvoiceRejectionPopupComponent } from './invoice-rejection-dialog.component';
import { InvoiceRejectionDeletePopupComponent } from './invoice-rejection-delete-dialog.component';

@Injectable()
export class InvoiceRejectionResolvePagingParams implements Resolve<any> {

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

export const invoiceRejectionRoute: Routes = [
    {
        path: 'invoice-rejection',
        component: InvoiceRejectionComponent,
        resolve: {
            'pagingParams': InvoiceRejectionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceRejection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-rejection/:id',
        component: InvoiceRejectionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceRejection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceRejectionPopupRoute: Routes = [
    {
        path: 'invoice-rejection-new',
        component: InvoiceRejectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-rejection/:id/edit',
        component: InvoiceRejectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-rejection/:id/delete',
        component: InvoiceRejectionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
