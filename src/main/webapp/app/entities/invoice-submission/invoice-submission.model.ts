import { BaseEntity } from './../../shared';

export class InvoiceSubmission implements BaseEntity {
    constructor(
        public id?: number,
        public submitted?: boolean,
        public dateCreation?: any,
        public dateModification?: any,
        public invoiceId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
        this.submitted = false;
    }
}
