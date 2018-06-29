import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    LeaveConfigService,
    LeaveConfigPopupService,
    LeaveConfigComponent,
    LeaveConfigDetailComponent,
    LeaveConfigDialogComponent,
    LeaveConfigPopupComponent,
    LeaveConfigDeletePopupComponent,
    LeaveConfigDeleteDialogComponent,
    leaveConfigRoute,
    leaveConfigPopupRoute,
    LeaveConfigResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...leaveConfigRoute,
    ...leaveConfigPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LeaveConfigComponent,
        LeaveConfigDetailComponent,
        LeaveConfigDialogComponent,
        LeaveConfigDeleteDialogComponent,
        LeaveConfigPopupComponent,
        LeaveConfigDeletePopupComponent,
    ],
    entryComponents: [
        LeaveConfigComponent,
        LeaveConfigDialogComponent,
        LeaveConfigPopupComponent,
        LeaveConfigDeleteDialogComponent,
        LeaveConfigDeletePopupComponent,
    ],
    providers: [
        LeaveConfigService,
        LeaveConfigPopupService,
        LeaveConfigResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendLeaveConfigModule {}
