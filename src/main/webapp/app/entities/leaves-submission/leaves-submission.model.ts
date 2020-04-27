import { BaseEntity } from './../../shared';

export class LeavesSubmission implements BaseEntity {
    constructor(
        public id?: number,
        public submitted?: boolean,
        public leavesDate?: any,
        public leavesId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.submitted = false;
    }
}
