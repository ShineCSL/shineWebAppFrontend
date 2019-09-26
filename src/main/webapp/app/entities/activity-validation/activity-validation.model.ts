import { BaseEntity } from './../../shared';

export class ActivityValidation implements BaseEntity {
    constructor(
        public id?: number,
        public weekNumber?: number,
        public year?: number,
        public validated?: boolean,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.validated = false;
    }
}
