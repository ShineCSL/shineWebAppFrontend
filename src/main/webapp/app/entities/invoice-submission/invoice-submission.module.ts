import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    InvoiceSubmissionService,
    InvoiceSubmissionPopupService,
    InvoiceSubmissionComponent,
    InvoiceSubmissionDetailComponent,
    InvoiceSubmissionDialogComponent,
    InvoiceSubmissionPopupComponent,
    InvoiceSubmissionDeletePopupComponent,
    InvoiceSubmissionDeleteDialogComponent,
    invoiceSubmissionRoute,
    invoiceSubmissionPopupRoute,
    InvoiceSubmissionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceSubmissionRoute,
    ...invoiceSubmissionPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceSubmissionComponent,
        InvoiceSubmissionDetailComponent,
        InvoiceSubmissionDialogComponent,
        InvoiceSubmissionDeleteDialogComponent,
        InvoiceSubmissionPopupComponent,
        InvoiceSubmissionDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceSubmissionComponent,
        InvoiceSubmissionDialogComponent,
        InvoiceSubmissionPopupComponent,
        InvoiceSubmissionDeleteDialogComponent,
        InvoiceSubmissionDeletePopupComponent,
    ],
    providers: [
        InvoiceSubmissionService,
        InvoiceSubmissionPopupService,
        InvoiceSubmissionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendInvoiceSubmissionModule {}
