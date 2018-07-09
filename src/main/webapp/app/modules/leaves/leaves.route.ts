import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LeavesComponent } from './leaves.component';
import { LeavesDetailComponent } from './leaves-detail.component';
import { LeavesPopupComponent } from './leaves-dialog.component';
import { LeavesDeletePopupComponent } from './leaves-delete-dialog.component';

@Injectable()
export class LeavesResolvePagingParams implements Resolve<any> {

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

export const leavesModuleRoute: Routes = [
    {
        path: 'leaves-module',
        component: LeavesComponent,
        resolve: {
            'pagingParams': LeavesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'leaves-module/:id',
        component: LeavesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leavesModulePopupRoute: Routes = [
    {
        path: 'leaves-module-new',
        component: LeavesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-module/:id/edit',
        component: LeavesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-module/:id/delete',
        component: LeavesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
