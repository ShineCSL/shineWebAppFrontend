import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            i18nEnabled: true,
            defaultI18nLang: 'fr'
        }),
        InfiniteScrollModule,
        CookieModule.forRoot()
    ],
    exports: [
        FormsModule,
        CustomFormsModule,
        HttpClientModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule
    ]
})
export class ShineWebAppFrontendSharedLibsModule {}
