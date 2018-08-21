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
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              const tree = this.router.parseUrl(this.router.url);
              if (tree.fragment) {
                console.log(tree.fragment);
                  const element = document.querySelector("#" + tree.fragment);
                  if (element) { 
                    element.scrollIntoView({behavior:"smooth"});
                  }
              }
           }
        });
       this.images.push(this.imgSrc1, this.imgSrc2, this.imgSrc3);
    }
  
    ngAfterViewInit() {
         console.log('navHome: ' + document.getElementById("navHome"));
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
      if (scrollPosition <= diffHomeServices/2) {
          var navHome = document.getElementById("navHome");
          navHome.className = 'nav-item active';
          var navServices = document.getElementById("navServices");
          navServices.className = 'nav-item';
          var navContact = document.getElementById("navContact");
          navContact.className = 'nav-item';
      } else if (scrollPosition >= diffHomeServices/2 && scrollPosition < servicesPosition + diffServicesContact/2) {
          var navHome = document.getElementById("navHome");
          navHome.className = 'nav-item';
          var navServices = document.getElementById("navServices");
          navServices.className = 'nav-item active';
          var navContact = document.getElementById("navContact");
          navContact.className = 'nav-item';
      } else if (scrollPosition >= servicesPosition +  diffServicesContact/2) {
          var navHome = document.getElementById("navHome");
          navHome.className = 'nav-item';
          var navServices = document.getElementById("navServices");
          navServices.className = 'nav-item';
          var navContact = document.getElementById("navContact");
          navContact.className = 'nav-item active';
      }
    }
}
