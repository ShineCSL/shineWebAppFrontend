import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ActivitySubmissionComponent } from './activity-submission.component';
import { ActivitySubmissionDetailComponent } from './activity-submission-detail.component';
import { ActivitySubmissionPopupComponent } from './activity-submission-dialog.component';
import { ActivitySubmissionDeletePopupComponent } from './activity-submission-delete-dialog.component';

@Injectable()
export class ActivitySubmissionResolvePagingParams implements Resolve<any> {

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

export const activitySubmissionRoute: Routes = [
    {
        path: 'activity-submission',
        component: ActivitySubmissionComponent,
        resolve: {
            'pagingParams': ActivitySubmissionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activitySubmission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'activity-submission/:id',
        component: ActivitySubmissionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activitySubmission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const activitySubmissionPopupRoute: Routes = [
    {
        path: 'activity-submission-new',
        component: ActivitySubmissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activitySubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-submission/:id/edit',
        component: ActivitySubmissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activitySubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-submission/:id/delete',
        component: ActivitySubmissionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activitySubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
