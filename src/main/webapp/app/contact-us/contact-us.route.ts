import { Route } from '@angular/router';

import { ContactUsComponent } from './';

export const CONTACT_US_ROUTE: Route = {
    path: 'contact',
    component: ContactUsComponent,
    data: {
        authorities: [],
        pageTitle: 'contactUs.title'
    }
};
