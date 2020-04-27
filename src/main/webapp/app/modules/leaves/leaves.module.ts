import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';

import { LeavesService } from '../../entities/leaves/leaves.service';
import { LeavesPopupService } from '../../entities/leaves/leaves-popup.service';

import { BrowserModule } from '@angular/platform-browser';
import { CustomIntegerDirective } from '../../shared';

import {
    MyLeavesComponent,
    MyLeavesDetailComponent,
    MyLeavesDialogComponent,
    LeavesTeamComponent,
    LeavesPopupComponent,
    LeavesDeletePopupComponent,
    MyLeavesDeleteDialogComponent,
    LeavesSubmitPopupComponent,
    MyLeavesSubmitDialogComponent,
    LeavesValidatePopupComponent,
    MyLeavesValidateDialogComponent,
    LeavesRejectPopupComponent,
    MyLeavesRejectDialogComponent,
    leavesModuleRoute,
    leavesModulePopupRoute,
    LeavesResolvePagingParams,
    LeavesDetailsUtils
} from './';

const ENTITY_STATES = [
    ...leavesModuleRoute,
    ...leavesModulePopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES),
        BrowserModule,
        ChartsModule
    ],
    declarations: [
        MyLeavesComponent,
        MyLeavesDetailComponent,
        MyLeavesDialogComponent,
        MyLeavesDeleteDialogComponent,
        MyLeavesSubmitDialogComponent,
        MyLeavesValidateDialogComponent,
        MyLeavesRejectDialogComponent,
        LeavesTeamComponent,
        LeavesPopupComponent,
        LeavesDeletePopupComponent,
        LeavesValidatePopupComponent,
        LeavesRejectPopupComponent,
        LeavesSubmitPopupComponent,
        CustomIntegerDirective
    ],
    entryComponents: [
        MyLeavesComponent,
        MyLeavesDialogComponent,
        LeavesTeamComponent,
        LeavesPopupComponent,
        MyLeavesDeleteDialogComponent,
        MyLeavesSubmitDialogComponent,
        MyLeavesValidateDialogComponent,
        MyLeavesRejectDialogComponent,
        LeavesDeletePopupComponent,
        LeavesSubmitPopupComponent,
        LeavesValidatePopupComponent,
        LeavesRejectPopupComponent,
    ],
    providers: [
        LeavesService,
        LeavesPopupService,
        LeavesResolvePagingParams,
        LeavesDetailsUtils
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendLeavesCustomModule {}
