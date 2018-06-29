import { BaseEntity } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public leave?: boolean,
        public dateModification?: any,
        public code?: string,
        public labelEn?: string,
        public labelFr?: string,
        public dateCreation?: any,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
        this.leave = false;
    }
}
