import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceValidationComponent } from './invoice-validation.component';
import { InvoiceValidationDetailComponent } from './invoice-validation-detail.component';
import { InvoiceValidationPopupComponent } from './invoice-validation-dialog.component';
import { InvoiceValidationDeletePopupComponent } from './invoice-validation-delete-dialog.component';

@Injectable()
export class InvoiceValidationResolvePagingParams implements Resolve<any> {

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

export const invoiceValidationRoute: Routes = [
    {
        path: 'invoice-validation',
        component: InvoiceValidationComponent,
        resolve: {
            'pagingParams': InvoiceValidationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-validation/:id',
        component: InvoiceValidationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceValidationPopupRoute: Routes = [
    {
        path: 'invoice-validation-new',
        component: InvoiceValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-validation/:id/edit',
        component: InvoiceValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-validation/:id/delete',
        component: InvoiceValidationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.invoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
