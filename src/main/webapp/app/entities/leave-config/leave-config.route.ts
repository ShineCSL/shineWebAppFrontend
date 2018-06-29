import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LeaveConfigComponent } from './leave-config.component';
import { LeaveConfigDetailComponent } from './leave-config-detail.component';
import { LeaveConfigPopupComponent } from './leave-config-dialog.component';
import { LeaveConfigDeletePopupComponent } from './leave-config-delete-dialog.component';

@Injectable()
export class LeaveConfigResolvePagingParams implements Resolve<any> {

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

export const leaveConfigRoute: Routes = [
    {
        path: 'leave-config',
        component: LeaveConfigComponent,
        resolve: {
            'pagingParams': LeaveConfigResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaveConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'leave-config/:id',
        component: LeaveConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaveConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leaveConfigPopupRoute: Routes = [
    {
        path: 'leave-config-new',
        component: LeaveConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaveConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leave-config/:id/edit',
        component: LeaveConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaveConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leave-config/:id/delete',
        component: LeaveConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaveConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
