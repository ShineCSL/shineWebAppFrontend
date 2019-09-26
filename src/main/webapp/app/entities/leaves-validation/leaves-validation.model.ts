import { BaseEntity } from './../../shared';

export class LeavesValidation implements BaseEntity {
    constructor(
        public id?: number,
        public validated?: boolean,
        public leavesDate?: any,
        public leavesId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.validated = false;
    }
}
