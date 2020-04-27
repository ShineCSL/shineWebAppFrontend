import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Leaves, LeavesService } from '../../entities/leaves';
import { ITEMS_PER_PAGE, Principal, User, UserService, DateUserUtils } from '../../shared';
import { Task, TaskService } from '../../entities/task';
import { LeavesDetail } from './leaves-detail.model';
import { LeavesDetailsUtils } from './leaves-details.utils';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'jhi-leaves',
    templateUrl: './leaves-team.component.html',
    styles: [`
             .hideSearch {
                 display: none;
             },`],
})
export class LeavesTeamComponent implements OnInit, OnDestroy {
    currentAccount: any;
    user: User;
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
    tasks: Task[] = [];
    currentMonth: number;
    currentYear: number;
    months: any;
    years: any;

    opened = 'false';

    /* Orders and filters*/
    filter: string;
    orderTask: string;
    orderLeavesDetails: string;
    reverseLists = false;

    language = '';

    leavesDetails: LeavesDetail[];
    userSelectedId: number;
    userSelectedLogin: string;
    userFilteredLogin: string;
    leaveValidated = false;

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
        private userService: UserService,
        private leavesDetailsUtils: LeavesDetailsUtils
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        /*this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });*/
        this.routeData = this.activatedRoute.queryParams.subscribe((data) => {
            this.setSortingOptions(data);
        });
        this.filter = '';
        this.orderTask = 'code';
        this.orderLeavesDetails = 'userLogin';
        this.reverseLists = false;
        this.taskService.query()
            .subscribe((res: HttpResponse<Task[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    loadAll() {
        this.leavesDetailsUtils.getLeavesDetailsForApprover(this.user.id).then((res) => {
            this.leavesDetails = res;
        });
        this.loadLeaves();
    }

    loadLeaves() {
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
        this.router.navigate([], {relativeTo: this.activatedRoute, queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadLeaves();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/leaves-team', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    ngOnInit() {
        this.currentMonth = this.dateUser.getCurrentMonth(null);
        this.currentYear = this.dateUser.getCurrentYear(null);
        this.months = this.dateUser.loadMonths();
        this.language = this.translateService.currentLang;
        this.years = this.dateUser.loadYears(this.currentYear);
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.userService.find(this.currentAccount.login).toPromise().then((response) => {
                this.user = response.body;
                this.loadAll();
            });
        });
        this.registerChangeInLeaves();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Leaves) {
        return item.id;
    }

    trackTaskById(index: number, item: Task) {
        return item.id;
    }

    trackLeavesDetailByUserLogin(index: number, item: LeavesDetail) {
        return item.userLogin;
    }

    registerChangeInLeaves() {
        this.eventSubscriber = this.eventManager.subscribe('leavesTeamModification', (response) => this.loadAll());
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
        this.userSelectedLogin = this.userFilteredLogin;
        this.loadLeaves();
    }

    toggleSearchCriterias() {
        if (this.opened === 'true') {
            this.opened = 'false';
        } else {
            this.opened = 'true';
        }
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
        if (this.userSelectedId) {
            Object.assign(query, {
                'userId.equals': this.userSelectedId
              });
        }
        if (this.leaveValidated != null) {
            Object.assign(query, {
                 'leavesValidationId.specified': this.leaveValidated
            });
        }
        Object.assign(query, {
            'leavesSubmissionId.specified': true
        });
        return query;
    }

    trackUserByUserLogin(index: number, item: LeavesDetail) {
        return item.userLogin;
    }

    onChangeUserSelect(event) {
        this.userFilteredLogin = event.target.options[event.target.selectedIndex].text;
    }

    selectUser(userId: number, userLogin: string) {
        this.userSelectedId = userId;
        this.userSelectedLogin = userLogin;
        this.loadAll();
    }

    private setSortingOptions(data) {
      if (data && Object.keys(data).length > 0) {
        this.page = data.page;
        this.previousPage = data.page;
        if (data.sort) {
          const sort = data.sort.split(',');
          this.predicate = sort[0];
          if (sort[1] === 'asc') {
            this.reverse = true;
          } else {
            this.reverse = false;
          }
        }
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.reverse = false;
        this.predicate = 'leavesFrom';
      }
    }
}
