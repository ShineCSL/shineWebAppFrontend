import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ActivityValidationComponent } from './activity-validation.component';
import { ActivityValidationDetailComponent } from './activity-validation-detail.component';
import { ActivityValidationPopupComponent } from './activity-validation-dialog.component';
import { ActivityValidationDeletePopupComponent } from './activity-validation-delete-dialog.component';

@Injectable()
export class ActivityValidationResolvePagingParams implements Resolve<any> {

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

export const activityValidationRoute: Routes = [
    {
        path: 'activity-validation',
        component: ActivityValidationComponent,
        resolve: {
            'pagingParams': ActivityValidationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'activity-validation/:id',
        component: ActivityValidationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const activityValidationPopupRoute: Routes = [
    {
        path: 'activity-validation-new',
        component: ActivityValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-validation/:id/edit',
        component: ActivityValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activity-validation/:id/delete',
        component: ActivityValidationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.activityValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
