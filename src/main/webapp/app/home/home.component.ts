import { Component, OnInit, AfterViewInit, HostListener, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { NavigationEnd } from '@angular/router';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]
})
export class HomeComponent implements OnInit, AfterViewInit {
    account: Account;
    modalRef: NgbModalRef;
    sendMessage: any;
    success: boolean;
    error: string;
    isButtonBackToTopVisible: boolean;

    constructor(
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private renderer: Renderer,
        private elem: ElementRef
    ) {
    }

    ngOnInit() {
      this.principal.identity().then((account) => {
          this.account = account;
      });
      this.registerAuthenticationSuccess();
      // this.images.push(this.imgCreativity, this.imgAutomation, this.imgCustomerEngagement, this.imgPeople);
      this.router.navigated = false;
      this.initHome();
      this.success = false;
      this.sendMessage = {};
      this.isButtonBackToTopVisible = false;
    }

    ngAfterViewInit() {
    }

    sendMessageAction() {
        let emailBody = 'Hello, Bonjour, \n\n' + this.sendMessage.message + '\n\n'  + this.sendMessage.name  + ', \n' + 'Cordialement/Regards ';
        emailBody = encodeURIComponent(emailBody);
        window.open('mailto:shinecsl@shinecsl.com' + '?subject=' + this.sendMessage.subject + '&body=' + emailBody, '_self');
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll(event) {
         const scrollPosition = window.pageYOffset;
         const navShine = document.getElementById('navShine');
         const socialLinks = document.getElementById('socialLinks');
         const homeNavItems = ['Home', 'AboutUs', 'Services', 'Contact'];
         const navShineHeight = navShine.offsetHeight;
         const elements = this.elem.nativeElement.querySelectorAll('section');
         for (let i = 0; i < elements.length; i++) {
             const element = elements[i];
             const offsetTop = element.offsetTop - navShineHeight;
             const sectionName = element.id[0].toUpperCase() + element.id.slice(1);
             
             if (element.id === 'contact') {
                 if (scrollPosition >= offsetTop) {
                     this.setInactiveAllItems(homeNavItems);
                     this.setActiveItem(sectionName);
                     this.setNavBgOthers(navShine, socialLinks);
                     this.isButtonBackToTopVisible = true;
                }
             } else {
                 const nextSibOffsetTop = element.nextElementSibling.offsetTop - navShineHeight;
                 if (scrollPosition >= offsetTop && scrollPosition <= nextSibOffsetTop) {
                     this.setInactiveAllItems(homeNavItems);
                     this.setActiveItem(sectionName);
                     if (element.id === 'home') {
                         if (scrollPosition >= 100) {
                             this.setNavBgOthers(navShine, socialLinks);
                        } else if(scrollPosition < 100) {
                            this.removeNavBgOthers(navShine, socialLinks);
                        }
                     } else {
                         this.setNavBgOthers(navShine, socialLinks);
                     }
                     this.isButtonBackToTopVisible = false;
                 }
             }
         }
    }

    private setNavBgOthers(navShine, socialLinks) {
      const menuNavBlack = 'bg-nav-others';
      const menuNavMain  = 'bg-nav-main';
      const hideSocialLinks  = 'social-links-display';
      navShine.classList.add(menuNavBlack);
      /*logoShine.classList.remove('logo-blue');
      logoShine.classList.add('logo-yellow');*/
      navShine.classList.remove(menuNavMain);
      socialLinks.classList.add(hideSocialLinks);
    }

    private removeNavBgOthers(navShine, socialLinks) {
        const menuNavBlack = 'bg-nav-others';
        const menuNavMain  = 'bg-nav-main';
        const hideSocialLinks  = 'social-links-display';
        navShine.classList.add(menuNavMain);
        navShine.classList.remove(menuNavBlack);
        /*logoShine.classList.remove('logo-yellow');
        logoShine.classList.add('logo-blue');*/
        socialLinks.classList.remove(hideSocialLinks);
    }

    setInactiveAllItems(arrayItems: string[]) {
        if (!this.isAuthenticated()) {
            for (const item of arrayItems) {
                const navItem = document.getElementById('navItem' + item);
                const aItem = document.getElementById('aItem' + item);
                navItem.className = 'nav-item';
                aItem.className = 'nav-link';
            }
        }
    }

    setActiveItem(item: string) {
        if (!this.isAuthenticated()) {
            const navItem = document.getElementById('navItem' + item);
            const aItem = document.getElementById('aItem' + item);
            navItem.className = 'nav-item active';
            aItem.className = 'nav-link active';
        } else {
            const navItem = document.getElementById('navItemHome');
            const aItem = document.getElementById('aItemHome');
            navItem.className = 'nav-item active';
            aItem.className = 'nav-link active';
        }
    }

    initHome(): void {
        const url = this.router.url;
        const urlSplit: string[] =  url.split('/');
        const navItem: string = urlSplit[urlSplit.length - 1];
        this.isButtonBackToTopVisible = false;
        if (navItem === '') {
            document.getElementById('navItemHome').className = 'nav-item active';
        } else {
            const section = navItem.substr(1);
            const navItemSection = 'navItem' + section[0].toUpperCase() + section.slice(1);
            document.getElementById(navItemSection).className = 'nav-item active';
            if (section === 'contact') {
                this.isButtonBackToTopVisible = true;
            }
        }
        this.scrollInto(100);
    }

    scrollInto(wait: number): void {
      const tree = this.router.parseUrl(this.router.url);
      if (tree.fragment) {
        const element = document.querySelector('#' + tree.fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
          }, wait);
        }
      }
    }
}
