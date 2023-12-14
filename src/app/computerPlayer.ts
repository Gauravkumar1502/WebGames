// using minmax algorithm to determine best move
// for computer player in a game of tic tac toe
export class ComputerPlayer {
    getBestMove(board: string[][]): number {
        let bestScore = -Infinity;
        let bestMove = -1;
        for (let i = 0; i < 9; i++) {
            if (board[Math.floor(i / 3)][i % 3] == '') {
                board[Math.floor(i / 3)][i % 3] = 'O';
                // computer player is maximizing an its computer turn
                let score = this.minimax(board, false);
                board[Math.floor(i / 3)][i % 3] = '';
                if (score > bestScore) {
                  bestScore = score;
                  bestMove = i;
                }
                // console.log(`after bestMove: ${bestMove}`);      
        }        
    }
    return bestMove;
  }
    minimax(board: string[][], isMaximizing: boolean): number {
        let result = this.isGameOver(board);
        if (result != '') {
            if (result == 'X') {
                return -1;
            } else if (result == 'O') {
                return 1;
            } else {
                return 0;
            }
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[Math.floor(i / 3)][i % 3] == '') {
                    board[Math.floor(i / 3)][i % 3] = 'O';
                    let score = this.minimax(board, false);
                    board[Math.floor(i / 3)][i % 3] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[Math.floor(i / 3)][i % 3] == '') {
                    board[Math.floor(i / 3)][i % 3] = 'X';
                    let score = this.minimax(board, true);
                    board[Math.floor(i / 3)][i % 3] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
    isGameOver(board: string[][]): string {
        // check rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] != '' &&
                board[i][0] == board[i][1] &&
                board[i][1] == board[i][2]
            ) {
                return board[i][0];
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i] != '' &&
                board[0][i] == board[1][i] &&
                board[1][i] == board[2][i]
            ) {
                return board[0][i];
            }
        }
        // check diagonals
        if (
            board[0][0] != '' &&
            board[0][0] == board[1][1] &&
            board[1][1] == board[2][2]
        ) {
            return board[0][0];
        }
        if (
            board[0][2] != '' &&
            board[0][2] == board[1][1] &&
            board[1][1] == board[2][0]
        ) {
            return board[0][2];
        }
        // check for tie
        let isTie = true;
        for (let i = 0; i < 9; i++) {
            if (board[Math.floor(i / 3)][i % 3] == '') {
                isTie = false;
                break;
            }
        }
        if (isTie) {
            return 'tie';
        }
        return '';
    }
}
