import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    ActivityRejectionService,
    ActivityRejectionPopupService,
    ActivityRejectionComponent,
    ActivityRejectionDetailComponent,
    ActivityRejectionDialogComponent,
    ActivityRejectionPopupComponent,
    ActivityRejectionDeletePopupComponent,
    ActivityRejectionDeleteDialogComponent,
    activityRejectionRoute,
    activityRejectionPopupRoute,
    ActivityRejectionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...activityRejectionRoute,
    ...activityRejectionPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActivityRejectionComponent,
        ActivityRejectionDetailComponent,
        ActivityRejectionDialogComponent,
        ActivityRejectionDeleteDialogComponent,
        ActivityRejectionPopupComponent,
        ActivityRejectionDeletePopupComponent,
    ],
    entryComponents: [
        ActivityRejectionComponent,
        ActivityRejectionDialogComponent,
        ActivityRejectionPopupComponent,
        ActivityRejectionDeleteDialogComponent,
        ActivityRejectionDeletePopupComponent,
    ],
    providers: [
        ActivityRejectionService,
        ActivityRejectionPopupService,
        ActivityRejectionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendActivityRejectionModule {}
