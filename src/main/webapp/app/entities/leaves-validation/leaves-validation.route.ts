import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LeavesValidationComponent } from './leaves-validation.component';
import { LeavesValidationDetailComponent } from './leaves-validation-detail.component';
import { LeavesValidationPopupComponent } from './leaves-validation-dialog.component';
import { LeavesValidationDeletePopupComponent } from './leaves-validation-delete-dialog.component';

@Injectable()
export class LeavesValidationResolvePagingParams implements Resolve<any> {

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

export const leavesValidationRoute: Routes = [
    {
        path: 'leaves-validation',
        component: LeavesValidationComponent,
        resolve: {
            'pagingParams': LeavesValidationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'leaves-validation/:id',
        component: LeavesValidationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leavesValidationPopupRoute: Routes = [
    {
        path: 'leaves-validation-new',
        component: LeavesValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-validation/:id/edit',
        component: LeavesValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-validation/:id/delete',
        component: LeavesValidationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leavesValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
