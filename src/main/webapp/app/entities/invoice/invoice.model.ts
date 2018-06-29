import { BaseEntity } from './../../shared';

export class Invoice implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public amount?: number,
        public dateInvoice?: any,
        public dateCreation?: any,
        public dateModification?: any,
        public documentContentType?: string,
        public document?: any,
        public rate?: number,
        public typeInvoiceId?: number,
        public invoiceSubmissionId?: number,
        public invoiceValidationId?: number,
        public invoiceRejectionId?: number,
        public currencyCode?: string,
        public currencyId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
    }
}
