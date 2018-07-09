import { BaseEntity } from './../../shared';

export class Mission implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public label?: string,
        public clientCode?: string,
        public clientId?: number,
    ) {
    }
}
