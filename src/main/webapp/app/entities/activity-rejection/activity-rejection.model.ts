import { BaseEntity } from './../../shared';

export class ActivityRejection implements BaseEntity {
    constructor(
        public id?: number,
        public rejected?: boolean,
        public dateCreation?: any,
        public dateModification?: any,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
        this.rejected = false;
    }
}
