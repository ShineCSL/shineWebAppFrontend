import { BaseEntity } from './../../shared';

export class LeavesRejection implements BaseEntity {
    constructor(
        public id?: number,
        public rejected?: boolean,
        public leavesDate?: any,
        public comment?: string,
        public leavesId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.rejected = false;
    }
}
