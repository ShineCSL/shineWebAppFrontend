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

    imgCreativity = require('../../content/images/creativity.png');
    imgCustomerEngagement = require('../../content/images/customer-engagement.jpg');
    imgPeople = require('../../content/images/people.jpg');
    imgTechnology = require('../../content/images/technology.jpg');
    
    images: Array<string> = [];

    constructor(
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }
    
    @ViewChild('home', { read: ElementRef }) public home: ElementRef;
    @ViewChild('services', { read: ElementRef }) public services: ElementRef;
    @ViewChild('values', { read: ElementRef }) public values: ElementRef;
    @ViewChild('contact', { read: ElementRef }) public contact: ElementRef;

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

       this.images.push(this.imgCreativity, this.imgCustomerEngagement, this.imgPeople);
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

      if (scrollPosition <= (diffHomeServices / 2)) {
          this.setInactiveAllItems(["Home", "Services", "Values", "Contact"]);
          this.setActiveItem("Home");
          navShine.classList.remove('bg-nav-white');          
      } else if (scrollPosition >= (diffHomeServices / 2) && scrollPosition < servicesPosition + (diffServicesValues / 2)) {
          this.setInactiveAllItems(["Home", "Services", "Values", "Contact"]);
          this.setActiveItem("Services");
          navShine.classList.add('bg-nav-white');        
      } else if (scrollPosition >= (diffServicesValues / 2) && scrollPosition < valuesPosition + (diffValuesContact / 2)) {
          this.setInactiveAllItems(["Home", "Services", "Values", "Contact"]);
          this.setActiveItem("Values");
          navShine.classList.add('bg-nav-white');
      } else if (scrollPosition >= valuesPosition + (diffValuesContact / 2)) {
          this.setInactiveAllItems(["Home", "Services", "Values", "Contact"]);
          this.setActiveItem("Contact");
          navShine.classList.add('bg-nav-white');          
      } else {
      	  console.log('scroll not home');
      }
    }

	setInactiveAllItems(arrayItems: string[]){
		for(let item of arrayItems){
			const navItem = document.getElementById('navItem' + item);
     		const aItem = document.getElementById('aItem' + item);
     		navItem.className = 'nav-item';
          	aItem.className = 'nav-link';    
		}
	}

	setActiveItem(item: string){
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
        console.log(tree.fragment);
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
