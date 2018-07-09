import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceConfigComponent } from './invoice-config.component';
import { InvoiceConfigDetailComponent } from './invoice-config-detail.component';
import { InvoiceConfigPopupComponent } from './invoice-config-dialog.component';
import { InvoiceConfigDeletePopupComponent } from './invoice-config-delete-dialog.component';

@Injectable()
export class InvoiceConfigResolvePagingParams implements Resolve<any> {

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

export const invoiceConfigRoute: Routes = [
    {
        path: 'invoice-config',
        component: InvoiceConfigComponent,
        resolve: {
            'pagingParams': InvoiceConfigResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-config/:id',
        component: InvoiceConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceConfigPopupRoute: Routes = [
    {
        path: 'invoice-config-new',
        component: InvoiceConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-config/:id/edit',
        component: InvoiceConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-config/:id/delete',
        component: InvoiceConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
