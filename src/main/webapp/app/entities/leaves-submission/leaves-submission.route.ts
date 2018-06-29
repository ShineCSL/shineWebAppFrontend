import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LeavesSubmissionComponent } from './leaves-submission.component';
import { LeavesSubmissionDetailComponent } from './leaves-submission-detail.component';
import { LeavesSubmissionPopupComponent } from './leaves-submission-dialog.component';
import { LeavesSubmissionDeletePopupComponent } from './leaves-submission-delete-dialog.component';

@Injectable()
export class LeavesSubmissionResolvePagingParams implements Resolve<any> {

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

export const leavesSubmissionRoute: Routes = [
    {
        path: 'leaves-submission',
        component: LeavesSubmissionComponent,
        resolve: {
            'pagingParams': LeavesSubmissionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesSubmission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'leaves-submission/:id',
        component: LeavesSubmissionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesSubmission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leavesSubmissionPopupRoute: Routes = [
    {
        path: 'leaves-submission-new',
        component: LeavesSubmissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesSubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-submission/:id/edit',
        component: LeavesSubmissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesSubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-submission/:id/delete',
        component: LeavesSubmissionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesSubmission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
