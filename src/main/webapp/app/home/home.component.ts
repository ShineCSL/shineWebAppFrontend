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

    imgSrc1 = require('../../content/images/creativity.jpg');
    imgSrc2 = require('../../content/images/engagement.jpg');
    imgSrc3 = require('../../content/images/people.jpg');
    imgSrc4 = require('../../content/images/technology1.jpg');
    
    imgAws = require('../../content/images/aws.jpg');
    imgWeb = require('../../content/images/jhipster-spring-boot-angular-bootstrap.jpg');
    imgCloud = require('../../content/images/mysql.png');
    imgOracle = require('../../content/images/oracle.png');
    
    images: Array<string> = [];

    @ViewChild('home', { read: ElementRef }) public home: ElementRef;
    @ViewChild('services', { read: ElementRef }) public services: ElementRef;
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

       this.images.push(this.imgSrc1, this.imgSrc2, this.imgSrc3);
       this.initHome();
    }

    ngAfterViewInit() {
        this.router.events.filter((event) => event instanceof NavigationEnd)
       		.subscribe(event => {
            this.router.navigated = false;
			this.scrollInto();
        });   
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
      const contactPosition = this.contact.nativeElement.offsetTop;
      const diffServicesContact = contactPosition - servicesPosition;
      const scrollPosition = window.pageYOffset;
      const navItemHome = document.getElementById('navItemHome');
      const navItemServices = document.getElementById('navItemServices');
      const navItemContact = document.getElementById('navItemContact');
      const navShine = document.getElementById('navShine');
      const aItemHome = document.getElementById('aItemHome');
      const aItemServices = document.getElementById('aItemServices');
      const aItemContact = document.getElementById('aItemContact');

      if (scrollPosition <= (diffHomeServices / 2)) {
          navItemHome.className = 'nav-item active';
          aItemHome.className = 'nav-link active';          
          navItemServices.className = 'nav-item';
          aItemServices.className = 'nav-link';          
          navItemContact.className = 'nav-item';
          aItemContact.className = 'nav-link';
          navShine.classList.remove('bg-nav-white');          
      } else if (scrollPosition >= (diffHomeServices / 2) && scrollPosition < servicesPosition + (diffServicesContact / 2)) {
          navItemHome.className = 'nav-item';
          aItemHome.className = 'nav-link';                
          navItemServices.className = 'nav-item active';
          aItemServices.className = 'nav-link active';                   
          navItemContact.className = 'nav-item';
          aItemContact.className = 'nav-link';          
          navShine.classList.add('bg-nav-white');          
      } else if (scrollPosition >= servicesPosition +  (diffServicesContact / 2)) {
          navItemHome.className = 'nav-item';
          aItemHome.className = 'nav-link';                
          navItemServices.className = 'nav-item';
          aItemServices.className = 'nav-link';                    
          navItemContact.className = 'nav-item active';
          aItemContact.className = 'nav-link active';
          navShine.classList.add('bg-nav-white');          
      } else {
      	  console.log('scroll not home');
      }
    }

    initHome(): void {
    	const url = this.router.url;
    	const navItemHome = document.getElementById('navItemHome');
      	const navItemServices = document.getElementById('navItemServices');
      	const navItemContact = document.getElementById('navItemContact');
    	if (url === '/') {
 			navItemHome.className = 'nav-item active';	
    	} else if (url.indexOf('#home') !== -1) {
 			navItemHome.className = 'nav-item active';
 			this.scrollInto();	
 		} else if (url.indexOf('#services') !== -1) {
 			navItemServices.className = 'nav-item active';
 			this.scrollInto();
 		} else if (url.indexOf('#contact') !== -1) {
 			navItemContact.className = 'nav-item active';
 			this.scrollInto();
 		}
    }

	scrollInto(): void {
        const tree = this.router.parseUrl(this.router.url);
        console.log(tree.fragment);
        if (tree.fragment) {
        	const element = document.querySelector('#' + tree.fragment);
	        if (element) {                  
	        	element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
	        }
        }	
	}
}
