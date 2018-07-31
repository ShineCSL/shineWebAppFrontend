import { BaseEntity } from './../../shared';

export class Leaves implements BaseEntity {
    constructor(
        public id?: number,
        public fullDay?: boolean,
        public leavesFrom?: any,
        public leavesTo?: any,
        public nbOfHours?: number,
        public year?: number,
        public weekNumber?: number,
        public comment?: string,
        public day?: number,
        public month?: number,
        public userLogin?: string,
        public userId?: number,
        public taskCode?: string,
        public taskId?: number,
        public leavesSubmissionSubmitted?: string,
        public leavesSubmissionId?: number,
        public leavesValidationValidated?: string,
        public leavesValidationId?: number,
        public leavesRejectionRejected?: string,
        public leavesRejectionId?: number,
    ) {
        this.fullDay = false;
    }
}
