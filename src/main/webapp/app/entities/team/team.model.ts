import { BaseEntity, User } from './../../shared';

export class Team implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public label?: string,
        public supervisorLogin?: string,
        public supervisorId?: number,
        public resources?: User[],
    ) {
    }
}
