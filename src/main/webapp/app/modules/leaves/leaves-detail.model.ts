export class LeavesDetail {
    constructor(
        public totalAnnualLeaves?: number,
        public totalSickLeaves?: number,
        public totalSpecialLeaves?: number,
    
        public takenAnnualLeaves?: number,
        public takenSickLeaves?: number,
        public takenSpecialLeaves?: number,
        
        public remainingAnnualLeaves?: number,
        public remainingSickLeaves?: number,
        public remainingSpecialLeaves?: number
    ) {
    }
}