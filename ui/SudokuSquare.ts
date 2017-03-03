
export class SudokuSquare {
    private possibleNumbers : number[] = [];

    // number can be undefined, or false, or 0
    constructor(private _number ?: number) {
        if (!_number) {
            this.possibleNumbers = [1,2,3,4,5,6,7,8,9];
        }
    }

    public isFound() : boolean {
        return !!this._number;
    }

    get number() : number {
        return this._number;
    }

    set number(number : number) {
        this._number = number;
        this.possibleNumbers = null;
    }

    public notNumber(num : number) : void {
        if (this.isFound()) return;

        let location : number = this.possibleNumbers.indexOf(num);
        if (location != -1) {
            this.possibleNumbers.splice(location, 1);
        }
    }

    public mightBe(num : number) : boolean {
        return this.possibleNumbers.indexOf(num) != -1;
    }

    public getPossible() : number[] {
        return this.possibleNumbers;
    }

    public setPossible(possible : number[]) {
        this.possibleNumbers = possible;
    }

    /**
     * returns boolean if we didn't know the number before, but it only had 1 possible left and is not identified.
     */
    public tryIdentify() : boolean {
        if (this.isFound()) return false;

        if (this.possibleNumbers.length == 1) {
            this.number = this.possibleNumbers[0];
            return true;
        }

        return false;
    }
}