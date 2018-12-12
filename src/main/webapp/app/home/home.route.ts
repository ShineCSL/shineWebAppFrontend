import { Route } from '@angular/router';

import { HomeComponent } from './';
import { HomeWebsitePopupComponent } from './popups/home-website/home-website-dialog.component';
import { HomeApplicationPopupComponent } from './popups/home-application/home-application-dialog.component';
import { HomeResourcePopupComponent } from './popups/home-resource/home-resource-dialog.component';

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

export const HOME_APPLICATION_DIALOG_ROUTE: Route = {
    path: 'home-application-popup',
    component: HomeApplicationPopupComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
    outlet: 'popup'
};

export const HOME_RESOURCE_DIALOG_ROUTE: Route = {
    path: 'home-resource-popup',
    component: HomeResourcePopupComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
    outlet: 'popup'
};