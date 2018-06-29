import { BaseEntity } from './../../shared';

export class LeavesRejection implements BaseEntity {
    constructor(
        public id?: number,
        public rejected?: boolean,
        public dateModification?: any,
        public dateCreation?: any,
        public leavesId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
        this.rejected = false;
    }
}
