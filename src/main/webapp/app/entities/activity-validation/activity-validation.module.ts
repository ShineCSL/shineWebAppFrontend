import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import { ShineWebAppFrontendAdminModule } from '../../admin/admin.module';
import {
    ActivityValidationService,
    ActivityValidationPopupService,
    ActivityValidationComponent,
    ActivityValidationDetailComponent,
    ActivityValidationDialogComponent,
    ActivityValidationPopupComponent,
    ActivityValidationDeletePopupComponent,
    ActivityValidationDeleteDialogComponent,
    activityValidationRoute,
    activityValidationPopupRoute,
    ActivityValidationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...activityValidationRoute,
    ...activityValidationPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActivityValidationComponent,
        ActivityValidationDetailComponent,
        ActivityValidationDialogComponent,
        ActivityValidationDeleteDialogComponent,
        ActivityValidationPopupComponent,
        ActivityValidationDeletePopupComponent,
    ],
    entryComponents: [
        ActivityValidationComponent,
        ActivityValidationDialogComponent,
        ActivityValidationPopupComponent,
        ActivityValidationDeleteDialogComponent,
        ActivityValidationDeletePopupComponent,
    ],
    providers: [
        ActivityValidationService,
        ActivityValidationPopupService,
        ActivityValidationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendActivityValidationModule {}
