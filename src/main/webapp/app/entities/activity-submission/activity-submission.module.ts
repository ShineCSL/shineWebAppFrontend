import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    ActivitySubmissionService,
    ActivitySubmissionPopupService,
    ActivitySubmissionComponent,
    ActivitySubmissionDetailComponent,
    ActivitySubmissionDialogComponent,
    ActivitySubmissionPopupComponent,
    ActivitySubmissionDeletePopupComponent,
    ActivitySubmissionDeleteDialogComponent,
    activitySubmissionRoute,
    activitySubmissionPopupRoute,
    ActivitySubmissionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...activitySubmissionRoute,
    ...activitySubmissionPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActivitySubmissionComponent,
        ActivitySubmissionDetailComponent,
        ActivitySubmissionDialogComponent,
        ActivitySubmissionDeleteDialogComponent,
        ActivitySubmissionPopupComponent,
        ActivitySubmissionDeletePopupComponent,
    ],
    entryComponents: [
        ActivitySubmissionComponent,
        ActivitySubmissionDialogComponent,
        ActivitySubmissionPopupComponent,
        ActivitySubmissionDeleteDialogComponent,
        ActivitySubmissionDeletePopupComponent,
    ],
    providers: [
        ActivitySubmissionService,
        ActivitySubmissionPopupService,
        ActivitySubmissionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendActivitySubmissionModule {}
