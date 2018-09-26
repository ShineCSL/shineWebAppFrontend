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

    imgCreativity = require('../../content/images/creativity.jpg');
    imgCustomerEngagement = require('../../content/images/customer-engagement.jpg');
    imgPeople = require('../../content/images/people.png');
    imgTechnology = require('../../content/images/technology.jpg');
    imgAutomation = require('../../content/images/automation.jpg');

    images: Array<string> = [];

    @ViewChild('home', { read: ElementRef }) public home: ElementRef;
    @ViewChild('services', { read: ElementRef }) public services: ElementRef;
    @ViewChild('values', { read: ElementRef }) public values: ElementRef;
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
      this.images.push(this.imgCreativity, this.imgAutomation, this.imgCustomerEngagement, this.imgPeople);
      this.router.navigated = false;
      this.initHome();
    }

    ngAfterViewInit() {
        /*this.router.events.filter((event) => event instanceof NavigationEnd)
       		.subscribe(event => {
			this.scrollInto();
        });  */
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
      const servicesPosition = this.services.nativeElement.offsetTop;
      const diffHomeServices = servicesPosition - homePosition;
      const valuesPosition = this.values.nativeElement.offsetTop;
      const diffServicesValues = valuesPosition - servicesPosition;
      const contactPosition = this.contact.nativeElement.offsetTop;
      const diffValuesContact = contactPosition - valuesPosition;
      const scrollPosition = window.pageYOffset;
      const navShine = document.getElementById('navShine');
      const homeNavItems = ['Home', 'Services', 'Values', 'Contact'];
      const menuNavBlack = 'bg-nav-dark-gray';
      if (scrollPosition <= (diffHomeServices / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Home');
          navShine.classList.remove(menuNavBlack);
      } else if (scrollPosition >= (diffHomeServices / 2) && scrollPosition < servicesPosition + (diffServicesValues / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Services');
          navShine.classList.add(menuNavBlack);
      } else if (scrollPosition >= (diffServicesValues / 2) && scrollPosition < valuesPosition + (diffValuesContact / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Values');
          navShine.classList.add(menuNavBlack);
      } else if (scrollPosition >= valuesPosition + (diffValuesContact / 2)) {
          this.setInactiveAllItems(homeNavItems);
          this.setActiveItem('Contact');
          navShine.classList.add(menuNavBlack);
      } else {
        console.log('scroll not home');
      }
    }

    setInactiveAllItems(arrayItems: string[]) {
      for (const item of arrayItems) {
        const navItem = document.getElementById('navItem' + item);
        const aItem = document.getElementById('aItem' + item);
        navItem.className = 'nav-item';
        aItem.className = 'nav-link';
      }
    }

    setActiveItem(item: string) {
      const navItem = document.getElementById('navItem' + item);
      const aItem = document.getElementById('aItem' + item);
      navItem.className = 'nav-item active';
      aItem.className = 'nav-link active';
    }

    initHome(): void {
      const url = this.router.url;
      const navItemHome = document.getElementById('navItemHome');
      const navItemServices = document.getElementById('navItemServices');
      const navItemValues = document.getElementById('navItemValues');
      const navItemContact = document.getElementById('navItemContact');
      if (url === '/') {
        navItemHome.className = 'nav-item active';
        this.scrollInto(100);
      } else if (url.indexOf('#home') !== -1) {
        navItemHome.className = 'nav-item active';
        this.scrollInto(100);
      } else if (url.indexOf('#services') !== -1) {
        navItemServices.className = 'nav-item active';
        this.scrollInto(100);
      } else if (url.indexOf('#values') !== -1) {
        navItemValues.className = 'nav-item active';
        this.scrollInto(100);
      } else if (url.indexOf('#contact') !== -1) {
        navItemContact.className = 'nav-item active';
        this.scrollInto(100);
      }
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
