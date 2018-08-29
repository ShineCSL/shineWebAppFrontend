import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
export class NavbarComponent implements OnInit, AfterViewInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    private activeSiteSection: string;
    private activeSiteMenu: string;

    @ViewChild('navShine') navShine: ElementRef;
    @ViewChild('navItemHome') navItemHome: ElementRef;
    @ViewChild('navItemServices') navItemServices: ElementRef;
    @ViewChild('navItemContact') navItemContact: ElementRef;
    @ViewChild('aItemHome') aItemHome: ElementRef;
    @ViewChild('aItemServices') aItemServices: ElementRef;
    @ViewChild('aItemContact') aItemContact: ElementRef;

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
            // override the route reuse strategy
	    this.router.routeReuseStrategy.shouldReuseRoute = function() {
	        return false;
	    };
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
 		this.siteURLActiveCheck();
        //this.activeSiteSection = 'home';
    }
    
    ngAfterViewInit() {
           this.router.events.filter((event) => event instanceof NavigationEnd)
       		.subscribe(event =>         
                this.siteURLActiveCheck());
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

    private siteURLActiveCheck(): void {
    	const url = this.router.url;
    	if (url === '/') {
 			this.activeSiteSection = 'home';
 			this.removeNavBgWhite();
    	} else if (url.indexOf('#home') !== -1) {
 			this.activeSiteSection = 'home';
 			this.removeNavBgWhite();
 		} else if (url.indexOf('#services') !== -1) {
 			this.activeSiteSection = 'services';
 			this.setNavBgWhite();		
 		} else if (url.indexOf('#contact') !== -1) {
 			this.activeSiteSection = 'contact';
 			this.setNavBgWhite();
 		} else if (url.indexOf('/my-leaves') !== -1) {
 			this.activeSiteSection = 'myLeaves';
 			this.activeSiteMenu = 'navItemModules';
 		} else if (url.indexOf('/leaves-team') !== -1) {
 			this.activeSiteSection = 'leavesTeam';
 			this.activeSiteMenu = 'navItemModules';
 		} else if (url.indexOf('/leaves') !== -1) {
 			this.activeSiteSection = 'leaves';
 			this.activeSiteMenu = 'navItemMenu';
 		} else if (url.indexOf('/account-details') !== -1) {
 			this.activeSiteSection = 'accountDetails';
 			this.activeSiteMenu = 'navItemMenu';
 		} else if (url.indexOf('/activity') !== -1) {
 			this.activeSiteSection = 'activity';
 			this.activeSiteMenu = 'navItemMenu';
 		} else if (url.indexOf('/user-management') !== -1) {
 			this.activeSiteSection = 'userManagement';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else if (url.indexOf('/jhi-metrics') !== -1) {
 			this.activeSiteSection = 'jhiMetrics';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else if (url.indexOf('/jhi-health') !== -1) {
 			this.activeSiteSection = 'jhiHealth';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else if (url.indexOf('/jhi-configuration') !== -1) {
 			this.activeSiteSection = 'jhiConfiguration';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else if (url.indexOf('/audits') !== -1) {
 			this.activeSiteSection = 'audits';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else if (url.indexOf('/logs') !== -1) {
 			this.activeSiteSection = 'logs';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else if (url.indexOf('/entity-audit') !== -1) {
 			this.activeSiteSection = 'entityAudit';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else if (url.indexOf('/docs') !== -1) {
 			this.activeSiteSection = 'docs';
 			this.activeSiteMenu = 'navItemAdmin';
 		} else {
 			this.activeSiteSection = '';
 			this.setNavBgWhite();
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

    isMenuActive(menu: string): boolean {
        return menu === this.activeSiteMenu;
    }
}
