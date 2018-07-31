import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PublicHolidayComponent } from './public-holiday.component';
import { PublicHolidayDetailComponent } from './public-holiday-detail.component';
import { PublicHolidayPopupComponent } from './public-holiday-dialog.component';
import { PublicHolidayDeletePopupComponent } from './public-holiday-delete-dialog.component';

@Injectable()
export class PublicHolidayResolvePagingParams implements Resolve<any> {

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

export const publicHolidayRoute: Routes = [
    {
        path: 'public-holiday',
        component: PublicHolidayComponent,
        resolve: {
            'pagingParams': PublicHolidayResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.publicHoliday.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'public-holiday/:id',
        component: PublicHolidayDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.publicHoliday.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const publicHolidayPopupRoute: Routes = [
    {
        path: 'public-holiday-new',
        component: PublicHolidayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.publicHoliday.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'public-holiday/:id/edit',
        component: PublicHolidayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.publicHoliday.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'public-holiday/:id/delete',
        component: PublicHolidayDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shineWebAppFrontendApp.publicHoliday.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
