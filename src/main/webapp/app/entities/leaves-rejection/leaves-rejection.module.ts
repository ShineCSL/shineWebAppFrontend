import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    LeavesRejectionService,
    LeavesRejectionPopupService,
    LeavesRejectionComponent,
    LeavesRejectionDetailComponent,
    LeavesRejectionDialogComponent,
    LeavesRejectionPopupComponent,
    LeavesRejectionDeletePopupComponent,
    LeavesRejectionDeleteDialogComponent,
    leavesRejectionRoute,
    leavesRejectionPopupRoute,
    LeavesRejectionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...leavesRejectionRoute,
    ...leavesRejectionPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LeavesRejectionComponent,
        LeavesRejectionDetailComponent,
        LeavesRejectionDialogComponent,
        LeavesRejectionDeleteDialogComponent,
        LeavesRejectionPopupComponent,
        LeavesRejectionDeletePopupComponent,
    ],
    entryComponents: [
        LeavesRejectionComponent,
        LeavesRejectionDialogComponent,
        LeavesRejectionPopupComponent,
        LeavesRejectionDeleteDialogComponent,
        LeavesRejectionDeletePopupComponent,
    ],
    providers: [
        LeavesRejectionService,
        LeavesRejectionPopupService,
        LeavesRejectionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendLeavesRejectionModule {}
