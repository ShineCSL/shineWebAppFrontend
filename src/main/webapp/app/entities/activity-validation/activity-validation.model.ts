import { BaseEntity } from './../../shared';

export class ActivityValidation implements BaseEntity {
    constructor(
        public id?: number,
        public weekNumber?: number,
        public year?: number,
        public validation?: boolean,
        public dateCreation?: any,
        public dateModification?: any,
        public userModificationLogin?: string,
        public userModificationId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
    ) {
        this.validation = false;
    }
}
