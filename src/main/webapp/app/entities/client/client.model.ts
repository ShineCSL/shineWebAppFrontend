import { BaseEntity } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public label?: string,
    ) {
    }
}
