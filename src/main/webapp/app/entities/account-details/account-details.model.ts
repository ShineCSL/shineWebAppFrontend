import { BaseEntity } from './../../shared';

export class AccountDetails implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public amount?: number,
        public type?: string,
        public rate?: number,
        public dateCreation?: any,
        public dateModification?: any,
        public clientId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModficationLogin?: string,
        public userModficationId?: number,
        public invoiceLabel?: string,
        public invoiceId?: number,
        public currencyCode?: string,
        public currencyId?: number,
    ) {
    }
}
