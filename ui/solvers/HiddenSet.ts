import {ISolvers} from "./ISolvers";
import {Sudoku, IPos} from "../sudoku";
import {SudokuSquare} from "../SudokuSquare";

export class HiddenSet implements ISolvers {
    constructor(private sudoku : Sudoku) {}

    public reduce() {
        for (let i : number = 0; i < 9; i++) {
            this.findHiddenSets(this.sudoku.getRow(i));
            this.findHiddenSets(this.sudoku.getColumn(i));
            this.findHiddenSets(this.sudoku.getGroup(i));
        }
    }

    private findHiddenSets(squares : SudokuSquare[]): void {
        let options: any = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        };
        // this contains numbers that appear 2, 3, or 4 times.
        let combosMatches : any = {
            2: [],
            3: [],
            4: []
        };

        for (let i : number = 0; i < squares.length; i++) {
            if (squares[i].isFound()) {
                delete options[squares[i].number];
            } else {
                squares[i].getPossible().forEach((num) => {
                    if (!options[num]) return;
                    options[num].push(squares[i]);
                });
            }
        }

        Object.keys(options).forEach((index : string) => {
            if (combosMatches[options[index].length]) {
                combosMatches[options[index].length].push(parseInt(index));
            }
        });

        // TODO: support more than 2
        if (combosMatches[2].length > 1) {
            this.combinations(combosMatches[2], 2).forEach(this.runComboMatches(squares, options));
        }
    }

    private runComboMatches(squares : SudokuSquare[], options : any) {
        return (set : number[]) => {
            // TODO: support more than 2
            let match : boolean = options[set[0]][0] == options[set[1]][0] &&
                options[set[0]][1] == options[set[1]][1];

            // options[set[0]].forEach((square) => {
            //     match = match && square
            // });

            if (match) {
                squares.forEach((square) => {
                    if (square != options[set[0]][0] && square != options[set[0]][1]) {
                        square.notNumber(set[0]);
                        square.notNumber(set[1]);
                    } else {
                        square.setPossible(set);
                    }
                });
            }
        }
    }


    /**
     * generate all combinations of list to a specific size.
     * [1,2,3], 2 => [1,2],[1,3],[2,3]
     * The order of the items within each combo might not be in order.
     */
    private combinations(list : number[], size : number) : number[][] {
        if (list.length <= size) {
            return [list];
        }
        if (size < 1) {
            return [[]];
        }

        let base = list.shift();

        return this.combinations(list.slice(0), size-1)
            .map((arr) => arr.concat(base))
            .concat(this.combinations(list, size));
    }
}

