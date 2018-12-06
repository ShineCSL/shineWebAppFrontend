import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParticlesModule } from 'angular-particle';

import { ShineWebAppFrontendSharedModule } from '../shared';

import { HOME_ROUTE, 
		 HOME_WEBSITE_DIALOG_ROUTE, 
		 HomeComponent, 
		 HomeWebsitePopupService,
    	 HomeWebsiteDialogComponent,
    	 HomeWebsitePopupComponent
} from './';

import { NavbarComponent } from '../layouts/navbar/navbar.component';

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild([ HOME_ROUTE, HOME_WEBSITE_DIALOG_ROUTE ]),
        ParticlesModule
    ],
    declarations: [
        HomeComponent,
        HomeWebsiteDialogComponent,
        HomeWebsitePopupComponent
    ],
    entryComponents: [
    	HomeWebsiteDialogComponent,
    	HomeWebsitePopupComponent
    ],
    providers: [
      NavbarComponent,
      HomeWebsitePopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShineWebAppFrontendHomeModule {}
