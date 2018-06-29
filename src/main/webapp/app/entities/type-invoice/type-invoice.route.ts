import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TypeInvoiceComponent } from './type-invoice.component';
import { TypeInvoiceDetailComponent } from './type-invoice-detail.component';
import { TypeInvoicePopupComponent } from './type-invoice-dialog.component';
import { TypeInvoiceDeletePopupComponent } from './type-invoice-delete-dialog.component';

@Injectable()
export class TypeInvoiceResolvePagingParams implements Resolve<any> {

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

export const typeInvoiceRoute: Routes = [
    {
        path: 'type-invoice',
        component: TypeInvoiceComponent,
        resolve: {
            'pagingParams': TypeInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.typeInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'type-invoice/:id',
        component: TypeInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.typeInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeInvoicePopupRoute: Routes = [
    {
        path: 'type-invoice-new',
        component: TypeInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.typeInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-invoice/:id/edit',
        component: TypeInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.typeInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-invoice/:id/delete',
        component: TypeInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.typeInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
