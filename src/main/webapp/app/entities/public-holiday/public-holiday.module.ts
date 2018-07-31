import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import {
    PublicHolidayService,
    PublicHolidayPopupService,
    PublicHolidayComponent,
    PublicHolidayDetailComponent,
    PublicHolidayDialogComponent,
    PublicHolidayPopupComponent,
    PublicHolidayDeletePopupComponent,
    PublicHolidayDeleteDialogComponent,
    publicHolidayRoute,
    publicHolidayPopupRoute,
    PublicHolidayResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...publicHolidayRoute,
    ...publicHolidayPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PublicHolidayComponent,
        PublicHolidayDetailComponent,
        PublicHolidayDialogComponent,
        PublicHolidayDeleteDialogComponent,
        PublicHolidayPopupComponent,
        PublicHolidayDeletePopupComponent,
    ],
    entryComponents: [
        PublicHolidayComponent,
        PublicHolidayDialogComponent,
        PublicHolidayPopupComponent,
        PublicHolidayDeleteDialogComponent,
        PublicHolidayDeletePopupComponent,
    ],
    providers: [
        PublicHolidayService,
        PublicHolidayPopupService,
        PublicHolidayResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendPublicHolidayModule {}
