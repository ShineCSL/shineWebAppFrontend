import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../shared';

import { CONTACT_US_ROUTE, ContactUsComponent } from './';

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild([ CONTACT_US_ROUTE ])
    ],
    declarations: [
        ContactUsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendContactUsModule {}
