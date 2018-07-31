import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Principal, Account, User, UserService } from '../../shared';
import { LeaveConfig, LeaveConfigService } from '../../entities/leave-config';
import { LeavesDetail } from './leaves-detail.model';
import { Leaves, LeavesService } from '../../entities/leaves/leaves';

@Injectable()
export class LeavesDetailsUtils {

    user: User;
    account: Account;
    leaveConfigs: LeaveConfig[];
    leavesDetail: LeavesDetail;

    constructor(
            private principal: Principal,
            private leaveConfigService: LeaveConfigService,
            private userService: UserService,
            private leavesService: LeavesService
    ) {
        this.init();
    }

    init() {
        this.principal.identity().then((account) => {
            this.account = account;
            this.userService.find(this.account.login).subscribe((response) => {
                this.user = response.body;
                
                
                this.leavesService.query({'user.login.equals': this.user, 
                    'year.equals': this.user, 
                    'user.login.equals': this.user})
                .subscribe((res: HttpResponse<LeaveConfig[]>) => this.onSuccessLeavesConfig(res.body), 
                        (res: HttpErrorResponse) => this.onError(res.message));
                
                
                this.leaveConfigService.query({'user.login.equals': this.user})
                    .subscribe((res: HttpResponse<LeaveConfig[]>) => this.onSuccessLeavesConfig(res.body), 
                            (res: HttpErrorResponse) => this.onError(res.message));
            });
        });
    }

    private onSuccessLeavesConfig(data){
        this.leaveConfigs = data;
        if(this.leaveConfigs.length > 0) {
            const leaveConfig: LeaveConfig = this.leaveConfigs[0];
            this.leavesDetail.totalAnnualLeaves = leaveConfig.nbAnnualLeaves;
            this.leavesDetail.totalSickLeaves = leaveConfig.nbSickLeaves;
            this.leavesDetail.totalSpecialLeaves = leaveConfig.nbSpecialLeaves;
        }
    }

    private onError(error: any) {
    }
}
