import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Principal, Account, User, UserService, DateUserUtils } from '../../shared';
import { LeaveConfig, LeaveConfigService } from '../../entities/leave-config';
import { LeavesDetail } from './leaves-detail.model';
import { Leaves, LeavesService } from '../../entities/leaves';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class LeavesDetailsUtils {

    account: Account;
    user: User;
    leaveConfigs: LeaveConfig[];
    leavesDetail: LeavesDetail = new LeavesDetail();
    leavesDetails: LeavesDetail[] = [];
    

    constructor(
            private principal: Principal,
            private leaveConfigService: LeaveConfigService,
            private userService: UserService,
            private leavesService: LeavesService,
            private dateUser: DateUserUtils
    ) {
        this.init();
    }

    init() {
        this.getLeaveDetails = this.getLeaveDetails.bind(this);
        this.getLeavesDetailsForApprover = this.getLeavesDetailsForApprover.bind(this);
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    getLeaveDetails(userLogin: string): Promise<LeavesDetail> {
        this.leaveConfigs = [];
        this.user = new User();
        if(userLogin){
            return this.userService.find(userLogin).toPromise().then((response) => {
                const user = response.body;  
                return Observable.forkJoin(
                        [this.getLeavesConfig(user.id),
                         this.getSumAnnualLeavesTaken(user.login),
                         this.getSumSickLeavesTaken(user.login),
                         this.getSumSpecialLeavesTaken(user.login)]).map((data) => {
                             this.leaveConfigs = data[0];
                             const leaveConfig: LeaveConfig = this.leaveConfigs[0];
                             this.setLeavesDetail(leaveConfig, this.getTakenLeavesData(data[1]), 
                                    this.getTakenLeavesData(data[2]), this.getTakenLeavesData(data[3]));
                             }).toPromise().then(() => this.leavesDetail);
            });    
        }else{
            return this.principal.identity().then((account) => {
                this.account = account;
                return this.userService.find(this.account.login).toPromise().then((response) => {
                    this.user = response.body;
                    return Observable.forkJoin(
                            [this.getLeavesConfig(null),
                             this.getSumAnnualLeavesTaken(null),
                             this.getSumSickLeavesTaken(null),
                             this.getSumSpecialLeavesTaken(null)]).map((data) => {
                                 this.leaveConfigs = data[0];
                                 const leaveConfig: LeaveConfig = this.leaveConfigs[0];
                                 this.setLeavesDetail(leaveConfig, this.getTakenLeavesData(data[1]), 
                                         this.getTakenLeavesData(data[2]), this.getTakenLeavesData(data[3]));
                                 }).toPromise().then(() => this.leavesDetail);
                });
            });
        }
    }

    private getTakenLeavesData(data: number) {
        if (data) {
            return data / 8;
        } else {
            return 0;
        }
    }
    
    private setLeavesDetail(leaveConfig: LeaveConfig, takenAnnualLeaves: number, takenSickLeaves: number, 
            takenSpecialLeaves: number){
        this.leavesDetail = new LeavesDetail();
        this.leavesDetail.userId = leaveConfig.userId;
        this.leavesDetail.userLogin = leaveConfig.userLogin;
        this.leavesDetail.totalAnnualLeaves = leaveConfig.nbAnnualLeaves;
        this.leavesDetail.takenAnnualLeaves = takenAnnualLeaves;
        this.leavesDetail.remainingAnnualLeaves = (this.leavesDetail.totalAnnualLeaves
              - this.leavesDetail.takenAnnualLeaves);
        this.leavesDetail.totalSickLeaves = leaveConfig.nbSickLeaves;
        this.leavesDetail.takenSickLeaves = takenSickLeaves;
        this.leavesDetail.remainingSickLeaves = (this.leavesDetail.totalSickLeaves
              - this.leavesDetail.takenSickLeaves);
        this.leavesDetail.totalSpecialLeaves = leaveConfig.nbSpecialLeaves;
        this.leavesDetail.takenSpecialLeaves = takenSpecialLeaves;
        this.leavesDetail.remainingSpecialLeaves = (this.leavesDetail.totalSpecialLeaves
              - this.leavesDetail.takenSpecialLeaves);
    }
    
    getLeavesDetailsForApprover(approverId: number): Promise<LeavesDetail[]> {
        this.leavesDetails = [];
        return  this.leaveConfigService.query({'approverId.equals': approverId}).toPromise().then(
                (res) => {
                    this.leaveConfigs = res.body; 
                    return this.processLeaveDetails(this.leaveConfigs).then(() => this.leavesDetails);
            });
    }

    private processLeaveDetails(leaveConfigs: LeaveConfig[]): Promise<LeavesDetail[]> {
        leaveConfigs.forEach(item => {
            this.getLeaveDetails(item.userLogin).then((res) => {
                this.leavesDetails.push(res);
            });
        }); 
        return Promise.all(this.leavesDetails);
    }

    private getLeavesConfig(userId: number) {
        let user = this.user.id;
        if(userId){
            user = userId;
        }
        return  this.leaveConfigService.query({'userId.equals': user})
        .map((res: HttpResponse<LeaveConfig[]>) => res.body, (res: HttpErrorResponse) => this.onError(res.message));
    }

    private getSumAnnualLeavesTaken(userLogin: string) {
        let user = this.account.login;
        if(userLogin){
            user = userLogin;
        }        
        return  this.leavesService.getSumHoursByUserYearAndTask(user, this.dateUser.getCurrentYear(null),
            'ANNUAL_LEAVE').map((res: HttpResponse<any>) => res, (res: HttpErrorResponse) => this.onError(res.message));
    }

    private getSumSickLeavesTaken(userLogin: string) {
        let user = this.account.login;
        if(userLogin){
            user = userLogin;
        }    
        return  this.leavesService.getSumHoursByUserYearAndTask(user, this.dateUser.getCurrentYear(null),
             'SICK_LEAVE').map((res: HttpResponse<any>) => res, (res: HttpErrorResponse) => this.onError(res.message));
     }

    private getSumSpecialLeavesTaken(userLogin: string) {
        let user = this.account.login;
        if(userLogin){
            user = userLogin;
        }  
        return  this.leavesService.getSumHoursByUserYearAndTask(user, this.dateUser.getCurrentYear(null),
             'SPECIAL_LEAVE').map((res: HttpResponse<any>) => res, (res: HttpErrorResponse) => this.onError(res.message));
    }

    private onError(error: any) {
    }
}
