import { BaseEntity } from './../../shared';

export class InvoiceRejection implements BaseEntity {
    constructor(
        public id?: number,
        public rejected?: boolean,
        public dateCreation?: any,
        public dateModification?: any,
        public invoiceId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
        this.rejected = false;
    }
}
