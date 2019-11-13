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
    private activeSiteDropdownMenu: string;

    @ViewChild('navShine') navShine: ElementRef;
    @ViewChild('socialLinks') socialLinks: ElementRef;

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
        const urlSplit: string[] =  url.split('/');
        const navItem: string = urlSplit[urlSplit.length - 1];
        const modulesMenu: string[] = ['myLeaves', 'leavesTeam'];
        const itemMenu: string[] = ['client', 'currency', 'leaveConfig', 'task', 'typeInvoice', 'mission', 'activityConfig', 'invoiceConfig', 'publicHoliday', 'team'];
        const adminMenu: string[] = ['userManagement', 'jhiMetrics', 'jhiHealth', 'jhiConfiguration', 'audits', 'logs', 'entityAudit', 'docs'];
        const accountMenu: string[] = ['settings', 'password'];
        this.activeSiteDropdownMenu = '';
        if (navItem === '') {
            this.activeSiteSection = 'home';
            this.activeSiteMenu = '';
            this.removeNavBgOthers();
            const element = document.querySelector('#home');
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        } else {
            if (navItem.search('#') === 0 ) {
                const section = navItem.substr(1);
                this.activeSiteMenu = '';
                if (section === 'home') {
                    this.activeSiteSection = 'home';
                    this.removeNavBgOthers();
                } else {
                    this.setNavBgOthers();
                    if (!this.isAuthenticated()) {
                        this.activeSiteSection = section;
                    } else {
                        this.activeSiteSection = 'home';
                    }
                }
                const element = document.querySelector(navItem);
                element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
            } else {
                const navItemSplit: string[] =  navItem.split('-');
                let navItemId: string = navItem;
                if (navItemSplit.length > 1) {
                    const secondPart: string = navItemSplit[1];
                    navItemId = navItemSplit[0] + secondPart[0].toUpperCase() + secondPart.slice(1);
                }
                this.activeSiteSection = navItemId;
                this.setNavBgOthers();
                if (modulesMenu.includes(navItemId)) {
                    this.activeSiteMenu = 'navItemModules';
                    this.activeSiteDropdownMenu = 'navDropdownMenuLeaves';
                } else if (itemMenu.includes(navItemId)) {
                    this.activeSiteMenu = 'navItemMenu';
                } else if (adminMenu.includes(navItemId)) {
                    this.activeSiteMenu = 'navItemAdmin';
                } else if (accountMenu.includes(navItemId)) {
                    this.activeSiteMenu = 'navItemAccount';
                } else {
                    this.activeSiteSection = '';
                    this.setNavBgOthers();
                }
            }
        }
    }

    private setNavBgOthers() {
      this.navShine.nativeElement.classList.add('bg-nav-others');
      this.socialLinks.nativeElement.classList.add('social-links-display');
      this.navShine.nativeElement.classList.remove('bg-nav-main');
    }

    private removeNavBgOthers() {
      this.navShine.nativeElement.classList.remove('bg-nav-others');
      this.socialLinks.nativeElement.classList.remove('social-links-display');
      this.navShine.nativeElement.classList.add('bg-nav-main');
    }

    isSectionActive(section: string): boolean {
        return section === this.activeSiteSection;
    }

    isMenuActive(menu: string): boolean {
        return menu === this.activeSiteMenu;
    }

    isDropdownMenuActive(menu: string): boolean {
        return menu === this.activeSiteDropdownMenu;
    }
}
