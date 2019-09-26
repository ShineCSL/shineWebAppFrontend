import { BaseEntity } from './../../shared';

export class InvoiceRejection implements BaseEntity {
    constructor(
        public id?: number,
        public rejected?: boolean,
        public dateInvoice?: any,
        public comment?: string,
        public invoiceId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.rejected = false;
    }
}
