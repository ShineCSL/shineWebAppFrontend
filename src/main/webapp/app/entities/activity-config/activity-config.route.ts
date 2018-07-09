import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ActivityConfigComponent } from './activity-config.component';
import { ActivityConfigDetailComponent } from './activity-config-detail.component';
import { ActivityConfigPopupComponent } from './activity-config-dialog.component';
import { ActivityConfigDeletePopupComponent } from './activity-config-delete-dialog.component';

@Injectable()
export class ActivityConfigResolvePagingParams implements Resolve<any> {

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

export const activityConfigRoute: Routes = [
    {
        path: 'activity-config',
        component: ActivityConfigComponent,
        resolve: {
            'pagingParams': ActivityConfigResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'activity-config/:id',
        component: ActivityConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const activityConfigPopupRoute: Routes = [
    {
        path: 'activity-config-new',
        component: ActivityConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-config/:id/edit',
        component: ActivityConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-config/:id/delete',
        component: ActivityConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
