import { BaseEntity } from './../../shared';

export class LeavesValidation implements BaseEntity {
    constructor(
        public id?: number,
        public validated?: boolean,
        public dateModification?: any,
        public dateCreation?: any,
        public leavesId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
    ) {
        this.validated = false;
    }
}
