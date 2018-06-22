import { Route } from '@angular/router';

import { ShineServicesComponent } from './';

export const SHINE_SERVICES_ROUTE: Route = {
    path: 'services',
    component: ShineServicesComponent,
    data: {
        authorities: [],
        pageTitle: 'shineServices.title'
    }
};
