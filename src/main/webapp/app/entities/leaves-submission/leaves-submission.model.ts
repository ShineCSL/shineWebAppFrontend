import { BaseEntity } from './../../shared';

export class LeavesSubmission implements BaseEntity {
    constructor(
        public id?: number,
        public submitted?: boolean,
        public dateModification?: any,
        public dateCreation?: any,
        public userModificationLogin?: string,
        public userModificationId?: number,
        public leavesId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
    ) {
        this.submitted = false;
    }
}
