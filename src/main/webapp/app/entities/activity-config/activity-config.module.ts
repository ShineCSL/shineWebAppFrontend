import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    ActivityConfigService,
    ActivityConfigPopupService,
    ActivityConfigComponent,
    ActivityConfigDetailComponent,
    ActivityConfigDialogComponent,
    ActivityConfigPopupComponent,
    ActivityConfigDeletePopupComponent,
    ActivityConfigDeleteDialogComponent,
    activityConfigRoute,
    activityConfigPopupRoute,
    ActivityConfigResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...activityConfigRoute,
    ...activityConfigPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActivityConfigComponent,
        ActivityConfigDetailComponent,
        ActivityConfigDialogComponent,
        ActivityConfigDeleteDialogComponent,
        ActivityConfigPopupComponent,
        ActivityConfigDeletePopupComponent,
    ],
    entryComponents: [
        ActivityConfigComponent,
        ActivityConfigDialogComponent,
        ActivityConfigPopupComponent,
        ActivityConfigDeleteDialogComponent,
        ActivityConfigDeletePopupComponent,
    ],
    providers: [
        ActivityConfigService,
        ActivityConfigPopupService,
        ActivityConfigResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendActivityConfigModule {}
