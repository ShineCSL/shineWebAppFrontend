import { BaseEntity } from './../../shared';

export class InvoiceSubmission implements BaseEntity {
    constructor(
        public id?: number,
        public submitted?: boolean,
        public dateInvoice?: any,
        public invoiceId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.submitted = false;
    }
}
