import { BaseEntity } from './../../shared';

export class LeaveConfig implements BaseEntity {
    constructor(
        public id?: number,
        public nbSickLeaves?: number,
        public nbAnnualLeaves?: number,
        public nbSpecialLeaves?: number,
        public dateCreation?: any,
        public dateModification?: any,
        public userLogin?: string,
        public userId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
    }
}
