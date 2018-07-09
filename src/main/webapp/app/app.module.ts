import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { ParticlesModule } from 'angular-particle';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { ShineWebAppFrontendSharedModule, UserRouteAccessService } from './shared';
import { ShineWebAppFrontendAppRoutingModule} from './app-routing.module';
import { ShineWebAppFrontendHomeModule } from './home/home.module';
import { ShineWebAppFrontendAdminModule } from './admin/admin.module';
import { ShineWebAppFrontendAccountModule } from './account/account.module';
import { ShineWebAppFrontendEntityModule } from './entities/entity.module';
import { ShineWebAppFrontendContactUsModule } from './contact-us/contact-us.module';
import { ShineWebAppFrontendAboutModule } from './about/about.module';
import { ShineWebAppFrontendShineServicesModule } from './shine-services/shine-services.module';

import { ShineWebAppFrontendCustomModule } from './modules/custom.module';

import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        ShineWebAppFrontendAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        ShineWebAppFrontendSharedModule,
        ShineWebAppFrontendHomeModule,
        ShineWebAppFrontendAdminModule,
        ShineWebAppFrontendAccountModule,
        ShineWebAppFrontendEntityModule,
        ParticlesModule,
        ShineWebAppFrontendContactUsModule,
        ShineWebAppFrontendAboutModule,
        ShineWebAppFrontendShineServicesModule,
        ShineWebAppFrontendCustomModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class ShineWebAppFrontendAppModule {}
