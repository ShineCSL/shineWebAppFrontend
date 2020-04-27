import { BaseEntity } from './../../shared';

export class LeaveConfig implements BaseEntity {
    constructor(
        public id?: number,
        public nbSickLeaves?: number,
        public nbAnnualLeaves?: number,
        public nbSpecialLeaves?: number,
        public userLogin?: string,
        public userId?: number,
        public approverLogin?: string,
        public approverId?: number,
    ) {
    }
}
