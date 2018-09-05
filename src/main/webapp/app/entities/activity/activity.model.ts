import { BaseEntity } from './../../shared';

export class Activity implements BaseEntity {
    constructor(
        public id?: number,
        public activityDate?: any,
        public nbOfHours?: number,
        public day?: number,
        public weekNumber?: number,
        public year?: number,
        public month?: number,
        public taskCode?: string,
        public taskId?: number,
        public userLogin?: string,
        public userId?: number,
        public clientCode?: string,
        public clientId?: number,
        public activityRejectionRejected?: string,
        public activityRejectionId?: number,
        public activitySubmissionSubmitted?: string,
        public activitySubmissionId?: number,
        public activityValidationValidated?: string,
        public activityValidationId?: number,
    ) {
    }
}
