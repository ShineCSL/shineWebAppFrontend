import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    InvoiceValidationService,
    InvoiceValidationPopupService,
    InvoiceValidationComponent,
    InvoiceValidationDetailComponent,
    InvoiceValidationDialogComponent,
    InvoiceValidationPopupComponent,
    InvoiceValidationDeletePopupComponent,
    InvoiceValidationDeleteDialogComponent,
    invoiceValidationRoute,
    invoiceValidationPopupRoute,
    InvoiceValidationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceValidationRoute,
    ...invoiceValidationPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceValidationComponent,
        InvoiceValidationDetailComponent,
        InvoiceValidationDialogComponent,
        InvoiceValidationDeleteDialogComponent,
        InvoiceValidationPopupComponent,
        InvoiceValidationDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceValidationComponent,
        InvoiceValidationDialogComponent,
        InvoiceValidationPopupComponent,
        InvoiceValidationDeleteDialogComponent,
        InvoiceValidationDeletePopupComponent,
    ],
    providers: [
        InvoiceValidationService,
        InvoiceValidationPopupService,
        InvoiceValidationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendInvoiceValidationModule {}
