import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    LeavesSubmissionService,
    LeavesSubmissionPopupService,
    LeavesSubmissionComponent,
    LeavesSubmissionDetailComponent,
    LeavesSubmissionDialogComponent,
    LeavesSubmissionPopupComponent,
    LeavesSubmissionDeletePopupComponent,
    LeavesSubmissionDeleteDialogComponent,
    leavesSubmissionRoute,
    leavesSubmissionPopupRoute,
    LeavesSubmissionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...leavesSubmissionRoute,
    ...leavesSubmissionPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LeavesSubmissionComponent,
        LeavesSubmissionDetailComponent,
        LeavesSubmissionDialogComponent,
        LeavesSubmissionDeleteDialogComponent,
        LeavesSubmissionPopupComponent,
        LeavesSubmissionDeletePopupComponent,
    ],
    entryComponents: [
        LeavesSubmissionComponent,
        LeavesSubmissionDialogComponent,
        LeavesSubmissionPopupComponent,
        LeavesSubmissionDeleteDialogComponent,
        LeavesSubmissionDeletePopupComponent,
    ],
    providers: [
        LeavesSubmissionService,
        LeavesSubmissionPopupService,
        LeavesSubmissionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendLeavesSubmissionModule {}
