import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../shared';

import { SHINE_SERVICES_ROUTE, ShineServicesComponent } from './';

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild([ SHINE_SERVICES_ROUTE ])
    ],
    declarations: [
        ShineServicesComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendShineServicesModule {}
