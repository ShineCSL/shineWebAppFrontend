import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Leaves } from '../../entities/leaves/leaves.model';
import { LeavesService } from '../../entities/leaves/leaves.service';

@Component({
    selector: 'jhi-leaves-detail',
    templateUrl: './my-leaves-detail.component.html'
})
export class MyLeavesDetailComponent implements OnInit, OnDestroy {

    leaves: Leaves;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leavesService: LeavesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeaves();
    }

    load(id) {
        this.leavesService.find(id)
            .subscribe((leavesResponse: HttpResponse<Leaves>) => {
                this.leaves = leavesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeaves() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leavesListModification',
            (response) => this.load(this.leaves.id)
        );
    }
}
