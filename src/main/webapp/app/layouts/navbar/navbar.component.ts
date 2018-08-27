import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { NavigationEnd } from '@angular/router';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from '../../shared';

import { VERSION } from '../../app.constants';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    private activeSiteSection: string;

    @ViewChild('navShine') navShine: ElementRef;
    @ViewChild('navItemServices') navItemServices: ElementRef;
    @ViewChild('navItemContact') navItemContact: ElementRef;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.SiteURLActiveCheck(event);
            }
        });
        this.activeSiteSection = 'home';
    }

    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    private SiteURLActiveCheck(event: NavigationEnd): void {
    	if (event.url.indexOf('#home') !== -1) {
 			this.activeSiteSection = 'home';
 			this.removeNavBgWhite();
 		} else if (event.url.indexOf('#services') !== -1) {
 			this.activeSiteSection = 'services';
 			this.setNavBgWhite();
 		} else if (event.url.indexOf('#contact') !== -1) {
 			this.activeSiteSection = 'contact';
 			this.setNavBgWhite();
 		} else {
 			this.activeSiteSection = '';
 			this.removeNavBgWhite();
 			this.navItemServices.nativeElement.className = 'nav-item';
 			this.navItemContact.nativeElement.className = 'nav-item';
 		}
    }

 	private setNavBgWhite() {
 		this.navShine.nativeElement.classList.add('bg-nav-white');
 	}

 	private removeNavBgWhite() {
 		this.navShine.nativeElement.classList.remove('bg-nav-white');
 	}

    isSectionActive(section: string): boolean {
        return section === this.activeSiteSection;
    }
}
