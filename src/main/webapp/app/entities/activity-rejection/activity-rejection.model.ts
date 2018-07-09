import { BaseEntity } from './../../shared';

export class ActivityRejection implements BaseEntity {
    constructor(
        public id?: number,
        public rejected?: boolean,
        public weekNumber?: number,
        public year?: number,
        public comment?: string,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.rejected = false;
    }
}
