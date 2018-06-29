import { BaseEntity } from './../../shared';

export class Leaves implements BaseEntity {
    constructor(
        public id?: number,
        public leaveDate?: any,
        public nbOfHours?: number,
        public year?: number,
        public dateCreation?: any,
        public dateModification?: any,
        public weekNumber?: number,
        public comment?: string,
        public userLogin?: string,
        public userId?: number,
        public leavesSubmissionId?: number,
        public leavesValidationId?: number,
        public leavesRejectionId?: number,
        public taskCode?: string,
        public taskId?: number,
    ) {
    }
}
