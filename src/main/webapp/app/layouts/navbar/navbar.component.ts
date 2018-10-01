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
    @ViewChild('logoShine') logoShine: ElementRef;

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
        this.siteURLActiveCheck();
    }

    ngAfterViewInit() {
           this.router.events.filter((event) => event instanceof NavigationEnd)
              .subscribe((event) => this.siteURLActiveCheck());
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
      // override the route reuse strategy
      this.router.navigated = false;
      const url = this.router.url;
      if (url === '/') {
        this.activeSiteSection = 'home';
        this.activeSiteMenu = '';
        this.removeNavBgDarkGray();
        const element = document.querySelector('#home');
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      } else if (url.indexOf('#home') !== -1) {
        this.activeSiteSection = 'home';
        this.activeSiteMenu = '';
        this.removeNavBgDarkGray();
        const element = document.querySelector('#home');
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      } else if (url.indexOf('#services') !== -1) {
        if(!this.isAuthenticated()){
	        this.activeSiteSection = 'services';
        } else {
        	this.activeSiteSection = 'home';
        }
        this.activeSiteMenu = '';   
        this.setNavBgDarkGray();
        const element = document.querySelector('#services');
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      } else if (url.indexOf('#values') !== -1) {
        if(!this.isAuthenticated()){
	        this.activeSiteSection = 'values';
        } else {
        	this.activeSiteSection = 'home';
        }
        this.activeSiteMenu = '';
        this.setNavBgDarkGray();
        const element = document.querySelector('#values');
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      } else if (url.indexOf('#contact') !== -1) {
        if(!this.isAuthenticated()){
	        this.activeSiteSection = 'contact';
        } else {
        	this.activeSiteSection = 'home';
        }
        this.activeSiteMenu = '';
        this.setNavBgDarkGray();
        const element = document.querySelector('#contact');
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      } else if (url.indexOf('/my-leaves') !== -1) {
        this.activeSiteSection = 'myLeaves';
        this.activeSiteMenu = 'navItemModules';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/leaves-team') !== -1) {
        this.activeSiteSection = 'leavesTeam';
        this.activeSiteMenu = 'navItemModules';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/client') !== -1) {
        this.activeSiteSection = 'client';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/currency') !== -1) {
        this.activeSiteSection = 'currency';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/leave-config') !== -1) {
        this.activeSiteSection = 'leaveConfig';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/task') !== -1) {
        this.activeSiteSection = 'task';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/type-invoice') !== -1) {
        this.activeSiteSection = 'typeInvoice';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/mission') !== -1) {
        this.activeSiteSection = 'mission';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/activity-config') !== -1) {
        this.activeSiteSection = 'activityConfig';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/invoice-config') !== -1) {
        this.activeSiteSection = 'invoiceConfig';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/public-holiday') !== -1) {
        this.activeSiteSection = 'publicHoliday';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/team') !== -1) {
        this.activeSiteSection = 'team';
        this.activeSiteMenu = 'navItemMenu';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/user-management') !== -1) {
        this.activeSiteSection = 'userManagement';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/jhi-metrics') !== -1) {
        this.activeSiteSection = 'jhiMetrics';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/jhi-health') !== -1) {
        this.activeSiteSection = 'jhiHealth';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/jhi-configuration') !== -1) {
        this.activeSiteSection = 'jhiConfiguration';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/audits') !== -1) {
        this.activeSiteSection = 'audits';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/logs') !== -1) {
        this.activeSiteSection = 'logs';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/entity-audit') !== -1) {
        this.activeSiteSection = 'entityAudit';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/docs') !== -1) {
        this.activeSiteSection = 'docs';
        this.activeSiteMenu = 'navItemAdmin';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/settings') !== -1) {
        this.activeSiteSection = 'settings';
        this.activeSiteMenu = 'navItemAccount';
        this.setNavBgDarkGray();
      } else if (url.indexOf('/password') !== -1) {
        this.activeSiteSection = 'password';
        this.activeSiteMenu = 'navItemAccount';
        this.setNavBgDarkGray();
      } else {
        this.activeSiteSection = '';
        this.setNavBgDarkGray();
      }
    }

    private setNavBgDarkGray() {
      this.navShine.nativeElement.classList.add('bg-nav-dark-gray');   
      this.logoShine.nativeElement.classList.remove('logo-blue');   
      this.logoShine.nativeElement.classList.add('logo-yellow');
    }

    private removeNavBgDarkGray() {
      this.navShine.nativeElement.classList.remove('bg-nav-dark-gray');   
      this.logoShine.nativeElement.classList.remove('logo-yellow');
      this.logoShine.nativeElement.classList.add('logo-blue');   
    }

    isSectionActive(section: string): boolean {
        return section === this.activeSiteSection;
    }

    isMenuActive(menu: string): boolean {
        return menu === this.activeSiteMenu;
    }
}
