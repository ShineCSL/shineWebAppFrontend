import { BaseEntity } from './../../shared';

export class PublicHoliday implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public dateHoliday?: any,
        public day?: number,
        public weekNumber?: number,
        public month?: number,
        public year?: number,
    ) {
    }
}
