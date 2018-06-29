import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    LeavesValidationService,
    LeavesValidationPopupService,
    LeavesValidationComponent,
    LeavesValidationDetailComponent,
    LeavesValidationDialogComponent,
    LeavesValidationPopupComponent,
    LeavesValidationDeletePopupComponent,
    LeavesValidationDeleteDialogComponent,
    leavesValidationRoute,
    leavesValidationPopupRoute,
    LeavesValidationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...leavesValidationRoute,
    ...leavesValidationPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LeavesValidationComponent,
        LeavesValidationDetailComponent,
        LeavesValidationDialogComponent,
        LeavesValidationDeleteDialogComponent,
        LeavesValidationPopupComponent,
        LeavesValidationDeletePopupComponent,
    ],
    entryComponents: [
        LeavesValidationComponent,
        LeavesValidationDialogComponent,
        LeavesValidationPopupComponent,
        LeavesValidationDeleteDialogComponent,
        LeavesValidationDeletePopupComponent,
    ],
    providers: [
        LeavesValidationService,
        LeavesValidationPopupService,
        LeavesValidationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendLeavesValidationModule {}
