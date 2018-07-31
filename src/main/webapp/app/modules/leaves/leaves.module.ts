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
    LeavesPopupComponent,
    LeavesDeletePopupComponent,
    MyLeavesDeleteDialogComponent,
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
        RouterModule.forChild(ENTITY_STATES),
        BrowserModule,
        ChartsModule
    ],
    declarations: [
        MyLeavesComponent,
        MyLeavesDetailComponent,
        MyLeavesDialogComponent,
        MyLeavesDeleteDialogComponent,
        LeavesPopupComponent,
        LeavesDeletePopupComponent,
        CustomIntegerDirective
    ],
    entryComponents: [
        MyLeavesComponent,
        MyLeavesDialogComponent,
        LeavesPopupComponent,
        MyLeavesDeleteDialogComponent,
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
