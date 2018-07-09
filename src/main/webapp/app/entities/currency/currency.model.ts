import { BaseEntity } from './../../shared';

export class Currency implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public labelEn?: string,
        public labelFr?: string,
    ) {
    }
}
