import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import {
    AccountDetailsService,
    AccountDetailsPopupService,
    AccountDetailsComponent,
    AccountDetailsDetailComponent,
    AccountDetailsDialogComponent,
    AccountDetailsPopupComponent,
    AccountDetailsDeletePopupComponent,
    AccountDetailsDeleteDialogComponent,
    accountDetailsRoute,
    accountDetailsPopupRoute,
    AccountDetailsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...accountDetailsRoute,
    ...accountDetailsPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AccountDetailsComponent,
        AccountDetailsDetailComponent,
        AccountDetailsDialogComponent,
        AccountDetailsDeleteDialogComponent,
        AccountDetailsPopupComponent,
        AccountDetailsDeletePopupComponent,
    ],
    entryComponents: [
        AccountDetailsComponent,
        AccountDetailsDialogComponent,
        AccountDetailsPopupComponent,
        AccountDetailsDeleteDialogComponent,
        AccountDetailsDeletePopupComponent,
    ],
    providers: [
        AccountDetailsService,
        AccountDetailsPopupService,
        AccountDetailsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendAccountDetailsModule {}
