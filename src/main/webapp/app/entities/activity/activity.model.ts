import { BaseEntity } from './../../shared';

export class Activity implements BaseEntity {
    constructor(
        public id?: number,
        public activityDate?: any,
        public nbOfHours?: number,
        public day?: number,
        public weekNumber?: number,
        public year?: number,
        public dateCreation?: any,
        public dateModification?: any,
        public taskCode?: string,
        public taskId?: number,
        public userLogin?: string,
        public userId?: number,
        public activitySubmissionId?: number,
        public activityValidationId?: number,
        public activityRejectionId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
        public missionCode?: string,
        public missionId?: number,
    ) {
    }
}
