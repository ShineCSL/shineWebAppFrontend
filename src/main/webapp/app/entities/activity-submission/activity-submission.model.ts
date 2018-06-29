import { BaseEntity } from './../../shared';

export class ActivitySubmission implements BaseEntity {
    constructor(
        public id?: number,
        public submitted?: boolean,
        public year?: number,
        public weekNumber?: number,
        public dateCreation?: any,
        public dateModification?: any,
        public userModificationLogin?: string,
        public userModificationId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
    ) {
        this.submitted = false;
    }
}
