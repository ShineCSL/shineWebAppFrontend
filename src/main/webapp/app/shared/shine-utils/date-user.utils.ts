import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Principal } from '../auth/principal.service';
import { UserService } from '../user/user.service';
import { PublicHolidayService } from '../../entities/public-holiday/public-holiday.service';

import { JhiDateUtils } from 'ng-jhipster';

import { Account } from '../user/account.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PublicHoliday } from '../../entities/public-holiday/public-holiday.model';
import { User } from '../user/user.model';

import * as _moment from 'moment';

@Injectable()
export class DateUserUtils {

    user: User;
    account: Account;
    publicHolidays: PublicHoliday[];

    constructor(
            private principal: Principal,
            private userService: UserService,
            private dateUtils: JhiDateUtils,
            private publicHolidayService: PublicHolidayService,
    ) {
        this.init();
        this.getHoliday = this.getHoliday.bind(this);
    }

    init() {
        this.principal.identity().then((account) => {
            this.account = account;
            this.userService.find(this.account.login).subscribe((response) => {
                this.user = response.body;
            });
        });
        this.publicHolidayService.query().subscribe(
                (res: HttpResponse<PublicHoliday[]>) => { this.publicHolidays = res.body; },
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    setDateUser(entity: any, date: any) {
        const now = _moment(this.dateUtils.convertLocalDateToServer(date));
        const day = now.date();
        const week = now.week();
        const month = now.month() + 1;
        const year = now.year();
        entity.day = day;
        entity.weekNumber = week;
        entity.month = month;
        entity.year = year;
        entity.userId = this.user.id;
    }

    getCurrentYear(date: string) {
        let now = _moment();
        if (date) {
            now = _moment(this.dateUtils.convertLocalDateToServer(date));
        }
        const year = now.year();
        return year;
    }

    getCurrentMonth(date: string) {
        let now = _moment();
        if (date) {
            now = _moment(this.dateUtils.convertLocalDateToServer(date));
        }
        const month = now.month() + 1;
        return month;
    }

    getCurrentWeek(date: string) {
        let now = _moment();
        if (date) {
            now = _moment(this.dateUtils.convertLocalDateToServer(date));
        }
        const week = now.week();
        return week;
    }

    getBusinessDaysBetweenDates(from: string, to: string) {
        const dateFrom = _moment(this.dateUtils.convertLocalDateToServer(from));
        const dateTo = _moment(this.dateUtils.convertLocalDateToServer(to));
        let businessDays = 0;
        while (dateFrom.isSameOrBefore(dateTo, 'day')) {
          if (dateFrom.day() !== 0 && dateFrom.day() !== 6 && !this.isHoliday(dateFrom.toDate())) {
              businessDays++;
          }
          dateFrom.add(1, 'd');
        }
        return businessDays;
    }

    isEndDateSameOrAfterStartDate(from: string, to: string) {
        const dateFrom = _moment(this.dateUtils.convertLocalDateToServer(from));
        const dateTo = _moment(this.dateUtils.convertLocalDateToServer(to));
        return dateTo.isSameOrAfter(dateFrom);
    }

    isHoliday(date: Date) {
        return !!this.publicHolidays.find((item) => {return new Date(item.dateHoliday).getTime() === date.getTime(); });
    }
    
    getHoliday(date: Date) {
        const holiday = this.publicHolidays.find((item) => new Date(item.dateHoliday).getTime() === date.getTime());
        return holiday ? holiday.label : '';
    }

    isWeekend(date: Date) {
        return (date.getDay() === 0 || date.getDay() === 6);
    }
    
    markCalendarDisabled(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        if (d.getDay() === 0 || d.getDay() === 6 || this.isHoliday(d)) {
            return date.day;
        }
        return null;
    }

    getCalendarHolidayTooltip(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        const holidayTooltip = this.getHoliday(d);
        if (holidayTooltip) {
            return holidayTooltip;
        } else {
          return '';
        }
    }   
  
    loadMonths() {
        const months = [
                         { 'id': 1, 'name': 'January'},
                         { 'id': 2, 'name': 'February'},
                         { 'id': 3, 'name': 'March'},
                         { 'id': 4, 'name': 'April'},
                         { 'id': 5, 'name': 'May'},
                         { 'id': 6, 'name': 'June'},
                         { 'id': 7, 'name': 'July'},
                         { 'id': 8, 'name': 'August'},
                         { 'id': 9, 'name': 'September'},
                         { 'id': 10, 'name': 'October'},
                         { 'id': 11, 'name': 'November'},
                         { 'id': 12, 'name': 'December'}
                       ];
        return months;
    }

    loadYears(currentYear: number) {
        const years = [
                        { 'id': currentYear - 2, 'name': currentYear - 2},
                        { 'id': currentYear - 1, 'name': currentYear - 1},
                        { 'id': currentYear, 'name': currentYear},
                        { 'id': currentYear + 1, 'name': currentYear + 1}
                      ];
        return years;
    }

    private onError(error: any) {
    }
}
