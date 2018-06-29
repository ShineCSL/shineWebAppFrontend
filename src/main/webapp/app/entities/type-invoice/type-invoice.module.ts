import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    TypeInvoiceService,
    TypeInvoicePopupService,
    TypeInvoiceComponent,
    TypeInvoiceDetailComponent,
    TypeInvoiceDialogComponent,
    TypeInvoicePopupComponent,
    TypeInvoiceDeletePopupComponent,
    TypeInvoiceDeleteDialogComponent,
    typeInvoiceRoute,
    typeInvoicePopupRoute,
    TypeInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...typeInvoiceRoute,
    ...typeInvoicePopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TypeInvoiceComponent,
        TypeInvoiceDetailComponent,
        TypeInvoiceDialogComponent,
        TypeInvoiceDeleteDialogComponent,
        TypeInvoicePopupComponent,
        TypeInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        TypeInvoiceComponent,
        TypeInvoiceDialogComponent,
        TypeInvoicePopupComponent,
        TypeInvoiceDeleteDialogComponent,
        TypeInvoiceDeletePopupComponent,
    ],
    providers: [
        TypeInvoiceService,
        TypeInvoicePopupService,
        TypeInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendTypeInvoiceModule {}
