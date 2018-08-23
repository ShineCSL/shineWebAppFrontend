import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MyLeavesComponent } from './my-leaves.component';
import { LeavesTeamComponent } from './leaves-team.component';
import { MyLeavesDetailComponent } from './my-leaves-detail.component';
import { LeavesPopupComponent } from './my-leaves-dialog.component';
import { LeavesDeletePopupComponent } from './my-leaves-delete-dialog.component';
import { LeavesSubmitPopupComponent } from './my-leaves-submit-dialog.component';
import { LeavesValidatePopupComponent } from './my-leaves-validate-dialog.component';
import { LeavesRejectPopupComponent } from './my-leaves-reject-dialog.component';

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
        path: 'my-leaves',
        component: MyLeavesComponent,
        resolve: {
            'pagingParams': LeavesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'leaves-team',
        component: LeavesTeamComponent,
        resolve: {
            'pagingParams': LeavesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shineWebAppFrontendApp.leavesTeam.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'leaves-module/:id',
        component: MyLeavesDetailComponent,
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
    },
    {
        path: 'leaves-module/:id/submit',
        component: LeavesSubmitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-module/:id/validate',
        component: LeavesValidatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'leaves-module/:id/reject',
        component: LeavesRejectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.leaves.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
