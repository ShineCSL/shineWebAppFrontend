import { Route } from '@angular/router';

import { HomeComponent } from './';
import { HomeWebsitePopupComponent } from './home-website-dialog.component';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};

export const HOME_WEBSITE_DIALOG_ROUTE: Route = {
    path: 'home-website-popup',
    component: HomeWebsitePopupComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
    outlet: 'popup'
};