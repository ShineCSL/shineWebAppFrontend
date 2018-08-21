import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Leaves, LeavesService } from '../../entities/leaves';
import { ITEMS_PER_PAGE, Principal, DateUserUtils } from '../../shared';
import { Task, TaskService } from '../../entities/task';
import { LeavesDetail } from './leaves-detail.model';
import { LeavesDetailsUtils } from './leaves-details.utils';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'jhi-leaves',
    templateUrl: './my-leaves.component.html',
    styles: [`
             .hideSearch {
                 display: none;
             },`],
})
export class MyLeavesComponent implements OnInit, OnDestroy {

currentAccount: any;
    leaves: Leaves[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    taskId: number;
    tasks: Task[];
    currentMonth: number;
    currentYear: number;
    months: any;
    years: any;

    opened: Boolean = true;

    filter: string;
    orderTask: string;
    language: string;

    leavesDetail: LeavesDetail;

    constructor(
        private leavesService: LeavesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private taskService: TaskService,
        private location: Location,
        private dateUser: DateUserUtils,
        private translateService: TranslateService,
        private principal: Principal,
        private leavesDetailsUtils: LeavesDetailsUtils
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.filter = '';
        this.orderTask = '';
        this.taskService.query()
            .subscribe((res: HttpResponse<Task[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    loadAll() {
        // alert(JSON.stringify(query));
        this.leavesDetailsUtils.getLeaveDetails(null).then((res) => {
            this.leavesDetail = res;
        });
        const query = this.getQueryFromSearchCriterias();
        this.leavesService.query(query).subscribe(
                (res: HttpResponse<Leaves[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/my-leaves'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/my-leaves', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    ngOnInit() {
       // this.leavesDetailsUtils.getLeavesDetails()
        //    .subscribe(data => { this.leavesDetail = data});
       // alert(JSON.stringify(this.leavesDetail));
        this.currentMonth = this.dateUser.getCurrentMonth(null);
        this.currentYear = this.dateUser.getCurrentYear(null);
        this.months = this.dateUser.loadMonths();
        this.language = this.translateService.currentLang;
        this.years = this.dateUser.loadYears(this.currentYear);
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLeaves();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Leaves) {
        return item.id;
    }

    registerChangeInLeaves() {
        this.eventSubscriber = this.eventManager.subscribe('leavesListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.leaves = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    submitFilter() {
        this.loadAll();
    }

    toggleSearchCriterias() {
        this.opened = !this.opened;
    }

    private getQueryFromSearchCriterias() {
        const query = {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()};
        if (this.currentMonth) {
            Object.assign(query, {
                'month.equals': this.currentMonth
              });
        }
        if (this.currentYear) {
            Object.assign(query, {
                'year.equals': this.currentYear
              });
        }
        if (this.taskId) {
            Object.assign(query, {
                'taskId.equals': this.taskId
              });
        }
        return query;
    }
}