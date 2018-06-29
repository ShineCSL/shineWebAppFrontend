import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LeavesRejectionComponent } from './leaves-rejection.component';
import { LeavesRejectionDetailComponent } from './leaves-rejection-detail.component';
import { LeavesRejectionPopupComponent } from './leaves-rejection-dialog.component';
import { LeavesRejectionDeletePopupComponent } from './leaves-rejection-delete-dialog.component';

@Injectable()
export class LeavesRejectionResolvePagingParams implements Resolve<any> {

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

export const leavesRejectionRoute: Routes = [
    {
        path: 'leaves-rejection',
        component: LeavesRejectionComponent,
        resolve: {
            'pagingParams': LeavesRejectionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesRejection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'leaves-rejection/:id',
        component: LeavesRejectionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesRejection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leavesRejectionPopupRoute: Routes = [
    {
        path: 'leaves-rejection-new',
        component: LeavesRejectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-rejection/:id/edit',
        component: LeavesRejectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-rejection/:id/delete',
        component: LeavesRejectionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
