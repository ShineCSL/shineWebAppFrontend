import { BaseEntity } from './../../shared';

export class TypeInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public labelEn?: string,
        public labelFr?: string,
    ) {
    }
}
