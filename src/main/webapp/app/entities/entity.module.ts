import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShineWebAppFrontendLeavesModule } from './leaves/leaves.module';
import { ShineWebAppFrontendAccountDetailsModule } from './account-details/account-details.module';
import { ShineWebAppFrontendActivityModule } from './activity/activity.module';
import { ShineWebAppFrontendActivityRejectionModule } from './activity-rejection/activity-rejection.module';
import { ShineWebAppFrontendActivitySubmissionModule } from './activity-submission/activity-submission.module';
import { ShineWebAppFrontendActivityValidationModule } from './activity-validation/activity-validation.module';
import { ShineWebAppFrontendClientModule } from './client/client.module';
import { ShineWebAppFrontendCurrencyModule } from './currency/currency.module';
import { ShineWebAppFrontendInvoiceModule } from './invoice/invoice.module';
import { ShineWebAppFrontendInvoiceRejectionModule } from './invoice-rejection/invoice-rejection.module';
import { ShineWebAppFrontendInvoiceSubmissionModule } from './invoice-submission/invoice-submission.module';
import { ShineWebAppFrontendInvoiceValidationModule } from './invoice-validation/invoice-validation.module';
import { ShineWebAppFrontendLeaveConfigModule } from './leave-config/leave-config.module';
import { ShineWebAppFrontendLeavesRejectionModule } from './leaves-rejection/leaves-rejection.module';
import { ShineWebAppFrontendLeavesSubmissionModule } from './leaves-submission/leaves-submission.module';
import { ShineWebAppFrontendLeavesValidationModule } from './leaves-validation/leaves-validation.module';
import { ShineWebAppFrontendTaskModule } from './task/task.module';
import { ShineWebAppFrontendTypeInvoiceModule } from './type-invoice/type-invoice.module';
import { ShineWebAppFrontendMissionModule } from './mission/mission.module';
import { ShineWebAppFrontendActivityConfigModule } from './activity-config/activity-config.module';
import { ShineWebAppFrontendInvoiceConfigModule } from './invoice-config/invoice-config.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ShineWebAppFrontendLeavesModule,
        ShineWebAppFrontendAccountDetailsModule,
        ShineWebAppFrontendActivityModule,
        ShineWebAppFrontendActivityRejectionModule,
        ShineWebAppFrontendActivitySubmissionModule,
        ShineWebAppFrontendActivityValidationModule,
        ShineWebAppFrontendClientModule,
        ShineWebAppFrontendCurrencyModule,
        ShineWebAppFrontendInvoiceModule,
        ShineWebAppFrontendInvoiceRejectionModule,
        ShineWebAppFrontendInvoiceSubmissionModule,
        ShineWebAppFrontendInvoiceValidationModule,
        ShineWebAppFrontendLeaveConfigModule,
        ShineWebAppFrontendLeavesRejectionModule,
        ShineWebAppFrontendLeavesSubmissionModule,
        ShineWebAppFrontendLeavesValidationModule,
        ShineWebAppFrontendTaskModule,
        ShineWebAppFrontendTypeInvoiceModule,
        ShineWebAppFrontendMissionModule,
        ShineWebAppFrontendActivityConfigModule,
        ShineWebAppFrontendInvoiceConfigModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendEntityModule {}
