import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShineWebAppFrontendSharedModule } from '../../shared';
import {
    MissionService,
    MissionPopupService,
    MissionComponent,
    MissionDetailComponent,
    MissionDialogComponent,
    MissionPopupComponent,
    MissionDeletePopupComponent,
    MissionDeleteDialogComponent,
    missionRoute,
    missionPopupRoute,
    MissionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...missionRoute,
    ...missionPopupRoute,
];

@NgModule({
    imports: [
        ShineWebAppFrontendSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MissionComponent,
        MissionDetailComponent,
        MissionDialogComponent,
        MissionDeleteDialogComponent,
        MissionPopupComponent,
        MissionDeletePopupComponent,
    ],
    entryComponents: [
        MissionComponent,
        MissionDialogComponent,
        MissionPopupComponent,
        MissionDeleteDialogComponent,
        MissionDeletePopupComponent,
    ],
    providers: [
        MissionService,
        MissionPopupService,
        MissionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShineWebAppFrontendMissionModule {}
