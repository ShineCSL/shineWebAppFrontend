import { BaseEntity } from './../../shared';

export class AccountDetails implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public rate?: number,
        public label?: string,
        public description?: string,
        public type?: string,
        public clientId?: number,
        public invoiceLabel?: string,
        public invoiceId?: number,
        public currencyCode?: string,
        public currencyId?: number,
    ) {
    }
}
