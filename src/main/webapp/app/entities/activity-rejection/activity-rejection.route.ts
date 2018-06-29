import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ActivityRejectionComponent } from './activity-rejection.component';
import { ActivityRejectionDetailComponent } from './activity-rejection-detail.component';
import { ActivityRejectionPopupComponent } from './activity-rejection-dialog.component';
import { ActivityRejectionDeletePopupComponent } from './activity-rejection-delete-dialog.component';

@Injectable()
export class ActivityRejectionResolvePagingParams implements Resolve<any> {

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

export const activityRejectionRoute: Routes = [
    {
        path: 'activity-rejection',
        component: ActivityRejectionComponent,
        resolve: {
            'pagingParams': ActivityRejectionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityRejection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'activity-rejection/:id',
        component: ActivityRejectionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityRejection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const activityRejectionPopupRoute: Routes = [
    {
        path: 'activity-rejection-new',
        component: ActivityRejectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-rejection/:id/edit',
        component: ActivityRejectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-rejection/:id/delete',
        component: ActivityRejectionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityRejection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
