import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    InvoiceRejectionService,
    InvoiceRejectionPopupService,
    InvoiceRejectionComponent,
    InvoiceRejectionDetailComponent,
    InvoiceRejectionDialogComponent,
    InvoiceRejectionPopupComponent,
    InvoiceRejectionDeletePopupComponent,
    InvoiceRejectionDeleteDialogComponent,
    invoiceRejectionRoute,
    invoiceRejectionPopupRoute,
    InvoiceRejectionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceRejectionRoute,
    ...invoiceRejectionPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceRejectionComponent,
        InvoiceRejectionDetailComponent,
        InvoiceRejectionDialogComponent,
        InvoiceRejectionDeleteDialogComponent,
        InvoiceRejectionPopupComponent,
        InvoiceRejectionDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceRejectionComponent,
        InvoiceRejectionDialogComponent,
        InvoiceRejectionPopupComponent,
        InvoiceRejectionDeleteDialogComponent,
        InvoiceRejectionDeletePopupComponent,
    ],
    providers: [
        InvoiceRejectionService,
        InvoiceRejectionPopupService,
        InvoiceRejectionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendInvoiceRejectionModule {}
