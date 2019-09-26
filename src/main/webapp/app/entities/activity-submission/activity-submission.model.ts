import { BaseEntity } from './../../shared';

export class ActivitySubmission implements BaseEntity {
    constructor(
        public id?: number,
        public submitted?: boolean,
        public year?: number,
        public weekNumber?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.submitted = false;
    }
}
