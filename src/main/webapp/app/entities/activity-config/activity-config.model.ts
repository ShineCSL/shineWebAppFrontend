import { BaseEntity } from './../../shared';

export class ActivityConfig implements BaseEntity {
    constructor(
        public id?: number,
        public userLogin?: string,
        public userId?: number,
        public approverLogin?: string,
        public approverId?: number,
    ) {
    }
}
