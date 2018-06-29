import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AccountDetailsComponent } from './account-details.component';
import { AccountDetailsDetailComponent } from './account-details-detail.component';
import { AccountDetailsPopupComponent } from './account-details-dialog.component';
import { AccountDetailsDeletePopupComponent } from './account-details-delete-dialog.component';

@Injectable()
export class AccountDetailsResolvePagingParams implements Resolve<any> {

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

export const accountDetailsRoute: Routes = [
    {
        path: 'account-details',
        component: AccountDetailsComponent,
        resolve: {
            'pagingParams': AccountDetailsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.accountDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'account-details/:id',
        component: AccountDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.accountDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountDetailsPopupRoute: Routes = [
    {
        path: 'account-details-new',
        component: AccountDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.accountDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'account-details/:id/edit',
        component: AccountDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.accountDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'account-details/:id/delete',
        component: AccountDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.accountDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
