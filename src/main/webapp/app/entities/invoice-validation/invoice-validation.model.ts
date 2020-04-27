import { BaseEntity } from './../../shared';

export class InvoiceValidation implements BaseEntity {
    constructor(
        public id?: number,
        public validated?: boolean,
        public dateInvoice?: any,
        public invoiceId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.validated = false;
    }
}
