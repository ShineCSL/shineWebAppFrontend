import { BaseEntity } from './../../shared';

export class Currency implements BaseEntity {
    constructor(
        public id?: number,
        public labelEn?: string,
        public labelFr?: string,
        public dateCreation?: any,
        public dateModification?: any,
        public code?: string,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
    }
}
