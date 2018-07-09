import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';

import { LeavesService } from '../../entities/leaves/leaves.service';
import { LeavesPopupService } from '../../entities/leaves/leaves-popup.service';


import {
    LeavesComponent,
    LeavesDetailComponent,
    LeavesDialogComponent,
    LeavesPopupComponent,
    LeavesDeletePopupComponent,
    LeavesDeleteDialogComponent,
    leavesModuleRoute,
    leavesModulePopupRoute,
    LeavesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...leavesModuleRoute,
    ...leavesModulePopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LeavesComponent,
        LeavesDetailComponent,
        LeavesDialogComponent,
        LeavesDeleteDialogComponent,
        LeavesPopupComponent,
        LeavesDeletePopupComponent,
    ],
    entryComponents: [
        LeavesComponent,
        LeavesDialogComponent,
        LeavesPopupComponent,
        LeavesDeleteDialogComponent,
        LeavesDeletePopupComponent,
    ],
    providers: [
        LeavesService,
        LeavesPopupService,
        LeavesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendLeavesCustomModule {}
