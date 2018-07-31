"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var shared_1 = require('../../shared');
var MyLeavesComponent = (function () {
    function MyLeavesComponent(leavesService, parseLinks, jhiAlertService, principal, activatedRoute, router, eventManager, taskService, location, dateUser, translateService) {
        var _this = this;
        this.leavesService = leavesService;
        this.parseLinks = parseLinks;
        this.jhiAlertService = jhiAlertService;
        this.principal = principal;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.eventManager = eventManager;
        this.taskService = taskService;
        this.location = location;
        this.dateUser = dateUser;
        this.translateService = translateService;
        this.opened = true;
        this.itemsPerPage = shared_1.ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(function (data) {
            _this.page = data.pagingParams.page;
            _this.previousPage = data.pagingParams.page;
            _this.reverse = data.pagingParams.ascending;
            _this.predicate = data.pagingParams.predicate;
        });
        this.filter = '';
        this.orderTask = '';
        this.taskService.query()
            .subscribe(function (res) { _this.tasks = res.body; }, function (res) { return _this.onError(res.message); });
    }
    MyLeavesComponent.prototype.loadAll = function () {
        var _this = this;
        var query = this.getQueryFromSearchCriterias();
        // alert(JSON.stringify(query));
        this.leavesService.query(query).subscribe(function (res) { return _this.onSuccess(res.body, res.headers); }, function (res) { return _this.onError(res.message); });
    };
    MyLeavesComponent.prototype.loadPage = function (page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    };
    MyLeavesComponent.prototype.transition = function () {
        this.router.navigate(['/leaves-module'], { queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    };
    MyLeavesComponent.prototype.clear = function () {
        this.page = 0;
        this.router.navigate(['/leaves-module', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }]);
        this.loadAll();
    };
    MyLeavesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentMonth = this.dateUser.getCurrentMonth(null);
        this.currentYear = this.dateUser.getCurrentYear(null);
        this.months = this.dateUser.loadMonths();
        this.language = this.translateService.currentLang;
        this.years = this.dateUser.loadYears(this.currentYear);
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInLeaves();
    };
    MyLeavesComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    MyLeavesComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    MyLeavesComponent.prototype.registerChangeInLeaves = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('leavesListModification', function (response) { return _this.loadAll(); });
    };
    MyLeavesComponent.prototype.sort = function () {
        var result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    };
    MyLeavesComponent.prototype.onSuccess = function (data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.leaves = data;
    };
    MyLeavesComponent.prototype.onError = function (error) {
        this.jhiAlertService.error(error.message, null, null);
    };
    MyLeavesComponent.prototype.submitFilter = function () {
        alert(this.currentYear);
        alert(this.currentMonth);
        this.loadAll();
    };
    MyLeavesComponent.prototype.toggle = function () {
        this.opened = !this.opened;
    };
    MyLeavesComponent.prototype.getQueryFromSearchCriterias = function () {
        var query = {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort() };
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
    };
    MyLeavesComponent = __decorate([
        core_1.Component({
            selector: 'jhi-leaves',
            templateUrl: './my-leaves.component.html',
            styles: ["\n             .hideSearch {\n                 display: none;\n             },"],
        })
    ], MyLeavesComponent);
    return MyLeavesComponent;
}());
exports.MyLeavesComponent = MyLeavesComponent;
