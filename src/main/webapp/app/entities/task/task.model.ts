import { BaseEntity } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public labelEn?: string,
        public labelFr?: string,
        public leave?: boolean,
    ) {
        this.leave = false;
    }
}
