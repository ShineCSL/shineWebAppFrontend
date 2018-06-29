import { BaseEntity } from './../../shared';

export class InvoiceValidation implements BaseEntity {
    constructor(
        public id?: number,
        public validation?: boolean,
        public dateCreation?: any,
        public dateModification?: any,
        public invoiceId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
        this.validation = false;
    }
}
