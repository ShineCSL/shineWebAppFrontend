import { BaseEntity } from './../../shared';

export class TypeInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public labelEn?: string,
        public labelFr?: string,
        public dateModification?: any,
        public dateCreation?: any,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
    }
}
