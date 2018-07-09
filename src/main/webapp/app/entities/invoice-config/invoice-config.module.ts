import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    InvoiceConfigService,
    InvoiceConfigPopupService,
    InvoiceConfigComponent,
    InvoiceConfigDetailComponent,
    InvoiceConfigDialogComponent,
    InvoiceConfigPopupComponent,
    InvoiceConfigDeletePopupComponent,
    InvoiceConfigDeleteDialogComponent,
    invoiceConfigRoute,
    invoiceConfigPopupRoute,
    InvoiceConfigResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceConfigRoute,
    ...invoiceConfigPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceConfigComponent,
        InvoiceConfigDetailComponent,
        InvoiceConfigDialogComponent,
        InvoiceConfigDeleteDialogComponent,
        InvoiceConfigPopupComponent,
        InvoiceConfigDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceConfigComponent,
        InvoiceConfigDialogComponent,
        InvoiceConfigPopupComponent,
        InvoiceConfigDeleteDialogComponent,
        InvoiceConfigDeletePopupComponent,
    ],
    providers: [
        InvoiceConfigService,
        InvoiceConfigPopupService,
        InvoiceConfigResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendInvoiceConfigModule {}
