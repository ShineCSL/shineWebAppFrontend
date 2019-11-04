import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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

    /*imgCreativity = require('../../content/images/creativity.jpg');
    imgCustomerEngagement = require('../../content/images/customer-engagement.jpg');
    imgPeople = require('../../content/images/people.png');
    imgTechnology = require('../../content/images/technology.jpg');
    imgAutomation = require('../../content/images/automation.jpg');

    imgTechnologyMobile = require('../../content/images/technology_mobile.jpg');

    images: Array<string> = [];*/

    @ViewChild('home', { read: ElementRef }) public home: ElementRef;
    @ViewChild('aboutUs', { read: ElementRef }) public aboutUs: ElementRef;
    @ViewChild('services', { read: ElementRef }) public services: ElementRef;
    //@ViewChild('values', { read: ElementRef }) public values: ElementRef;
    @ViewChild('contact', { read: ElementRef }) public contact: ElementRef;

    constructor(
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
      this.principal.identity().then((account) => {
        this.account = account;
      });
      this.registerAuthenticationSuccess();
      //this.images.push(this.imgCreativity, this.imgAutomation, this.imgCustomerEngagement, this.imgPeople);
      this.router.navigated = false;
      this.initHome();
      this.success = false;
      this.sendMessage = {};
      this.isButtonBackToTopVisible = false;
    }

    ngAfterViewInit() {
        /*this.router.events.filter((event) => event instanceof NavigationEnd)
       		.subscribe(event => {
			this.scrollInto();
        });  */
    }
    
	sendMessageAction(){
		var emailBody = this.sendMessage.message + '\n' + 'Cordialement/Regards ' + this.sendMessage.name + ',';
		emailBody = encodeURIComponent(emailBody);
    	window.open('mailto:shinecsl@shinecsl.com' + '?subject=' + this.sendMessage.subject + '&body=' + emailBody + "<br>", "_self");
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
      const homePosition = this.home.nativeElement.offsetTop;
      const aboutUsPosition = this.aboutUs.nativeElement.offsetTop;
      const diffHomeAboutUs = aboutUsPosition - homePosition;           
      const servicesPosition = this.services.nativeElement.offsetTop;
      const diffAboutUsServices = servicesPosition - aboutUsPosition;
      //const valuesPosition = this.values.nativeElement.offsetTop;
      //const diffServicesValues = valuesPosition - servicesPosition;
      const contactPosition = this.contact.nativeElement.offsetTop;
      const diffServicesContact = contactPosition - servicesPosition;
      const scrollPosition = window.pageYOffset;
      const navShine = document.getElementById('navShine');
      /*const logoShine = document.getElementById('logoShine');*/
      const socialLinks = document.getElementById('socialLinks');
      const homeNavItems = ['Home', 'AboutUs', 'Services', 'Contact'];
      this.isButtonBackToTopVisible = false;    
      if (scrollPosition <= (diffHomeAboutUs / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Home');
          this.removeNavBgDarkGray(navShine, socialLinks);
      } else if (scrollPosition >= (diffAboutUsServices / 2) && scrollPosition < aboutUsPosition + (diffAboutUsServices / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('AboutUs');
          this.setNavBgDarkGray(navShine, socialLinks);
      } else if (scrollPosition >= (diffServicesContact / 2) && scrollPosition < servicesPosition + (diffServicesContact / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Services');
          this.setNavBgDarkGray(navShine, socialLinks);
      /**} else if (scrollPosition >= (diffServicesValues / 2) && scrollPosition < valuesPosition + (diffValuesContact / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Values');
          this.setNavBgDarkGray(navShine, socialLinks);**/
      } else if (scrollPosition >= servicesPosition + (diffServicesContact / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Contact');
          this.setNavBgDarkGray(navShine, socialLinks);
	      this.isButtonBackToTopVisible = true;    
      } else {
        console.log('scroll not home');
      }
    }
    
    private setNavBgDarkGray(navShine, socialLinks) {
      const menuNavBlack = 'bg-nav-dark-gray';
      const menuNavMain  = 'bg-nav-main';
      const hideSocialLinks  = 'social-links-display';
      
      navShine.classList.add(menuNavBlack);   
      /*logoShine.classList.remove('logo-blue');   
      logoShine.classList.add('logo-yellow');*/
      navShine.classList.remove(menuNavMain);
      socialLinks.classList.add(hideSocialLinks);
    }

    private removeNavBgDarkGray(navShine, socialLinks) {
      const menuNavBlack = 'bg-nav-dark-gray';
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
      const navItemHome = document.getElementById('navItemHome');
      const navItemAboutUs = document.getElementById('navItemAboutUs');
      const navItemServices = document.getElementById('navItemServices');
      //const navItemValues = document.getElementById('navItemValues');
      const navItemContact = document.getElementById('navItemContact');
      this.isButtonBackToTopVisible = false;    
      if (url === '/' || this.isAuthenticated()) {
        navItemHome.className = 'nav-item active';
      } else if (url.indexOf('#home') !== -1) {
        navItemHome.className = 'nav-item active';
      } else if (url.indexOf('#aboutUs') !== -1) {
        navItemAboutUs.className = 'nav-item active';
      } else if (url.indexOf('#services') !== -1) {
        navItemServices.className = 'nav-item active';
      /**} else if (url.indexOf('#values') !== -1) {
        navItemValues.className = 'nav-item active';**/
      } else if (url.indexOf('#contact') !== -1) {
        navItemContact.className = 'nav-item active';
      	this.isButtonBackToTopVisible = true;    
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
