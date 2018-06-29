import { BaseEntity } from './../../shared';

export class Mission implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public label?: string,
        public dateCreation?: any,
        public dateModification?: any,
        public clientCode?: string,
        public clientId?: number,
        public userCreationLogin?: string,
        public userCreationId?: number,
        public userModificationLogin?: string,
        public userModificationId?: number,
    ) {
    }
}
