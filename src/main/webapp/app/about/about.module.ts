import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../shared';

import { ABOUT_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild([ ABOUT_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendAboutModule {}
