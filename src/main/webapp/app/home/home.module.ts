import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParticlesModule } from 'angular-particle';

import { ShineWebAppFrontendSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { NavbarComponent } from '../layouts/navbar/navbar.component';

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        ParticlesModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
      NavbarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShineWebAppFrontendHomeModule {}
