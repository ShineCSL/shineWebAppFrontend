import { BaseEntity } from './../../shared';

export class Invoice implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public description?: string,
        public amount?: number,
        public dateInvoice?: any,
        public documentContentType?: string,
        public document?: any,
        public rate?: number,
        public currencyCode?: string,
        public currencyId?: number,
        public invoiceRejectionRejected?: string,
        public invoiceRejectionId?: number,
        public invoiceSubmissionSubmitted?: string,
        public invoiceSubmissionId?: number,
        public invoiceValidationValidated?: string,
        public invoiceValidationId?: number,
        public typeInvoiceCode?: string,
        public typeInvoiceId?: number,
    ) {
    }
}
