import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ComputerPlayer } from './computerPlayer';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // get element with #dialog
  @ViewChild('dialog') dialog: any;
  title = 'TicTacToe';
  // ticTacToe grid
  // make an 2D array of 9 elements of type string
  // each element will be either "X", "O", or ""
  grid: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  isPlayerXTurn: boolean = true;
  xScore: number = 0;
  oScore: number = 0;
  gameOutcome: string = "";
  isPlayerVsPlayer: boolean = true;
  computerPlayer: ComputerPlayer = new ComputerPlayer();
  // store scores in local storage create 2 keys for playerX and playerO
  // if local storage is not null, then load scores from local storage
  // else set scores to 0
  ngOnInit() {
    if (localStorage.getItem("playerXScore") != null) {
      this.xScore = Number(localStorage.getItem("playerXScore"));
    } else {
      this.xScore = 0;
    }
    if (localStorage.getItem("playerOScore") != null) {
      this.oScore = Number(localStorage.getItem("playerOScore"));
    } else {
      this.oScore = 0;
    }
  }


  play(row: number, col: number) {
    if (this.grid[row][col] == "") {
      this.grid[row][col] = this.isPlayerXTurn ? "X" : "O";
      this.isPlayerXTurn = !this.isPlayerXTurn;
      this.gameOutcome = this.isGameOver();
      if (this.gameOutcome != "") {
        this.dialog.nativeElement.showModal();
      }
      if (this.gameOutcome == "X") {
        this.xScore++;
      } else if (this.gameOutcome == "O") {
        this.oScore++;
      }
      // save scores to local storage
      localStorage.setItem("playerXScore", String(this.xScore));
      localStorage.setItem("playerOScore", String(this.oScore));
    }
    // computer player's turn
    if (!this.isPlayerVsPlayer && 
      this.gameOutcome == "" &&
      !this.isPlayerXTurn) {
        console.log(this.computerPlayer.getBestMove(this.grid));
        const bestMove = this.computerPlayer.getBestMove(this.grid);
        this.grid[Math.floor(bestMove / 3)][bestMove % 3] = "O";
        this.isPlayerXTurn = true;
        this.gameOutcome = this.isGameOver();
        if (this.gameOutcome != "") {
          this.dialog.nativeElement.showModal();
        }
    }
  }
  newGame() {
    this.grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    this.isPlayerXTurn = true;
    this.gameOutcome = "";
    this.dialog.nativeElement.close();
  }
  resetScores() {
    this.xScore = 0;
    this.oScore = 0;
    localStorage.setItem("playerXScore", String(this.xScore));
    localStorage.setItem("playerOScore", String(this.oScore));
  }

  isGameOver(): string {
    // check if there is a winner
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]], // top row
      [[1, 0], [1, 1], [1, 2]], // middle row
      [[2, 0], [2, 1], [2, 2]], // bottom row
      [[0, 0], [1, 0], [2, 0]], // left column
      [[0, 1], [1, 1], [2, 1]], // middle column
      [[0, 2], [1, 2], [2, 2]], // right column
      [[0, 0], [1, 1], [2, 2]], // diagonal top left to bottom right
      [[0, 2], [1, 1], [2, 0]] // diagonal top right to bottom left
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const [rowA, colA] = a;
      const [rowB, colB] = b;
      const [rowC, colC] = c;
      if (
        this.grid[rowA][colA] != "" &&
        this.grid[rowA][colA] == this.grid[rowB][colB] &&
        this.grid[rowA][colA] == this.grid[rowC][colC]
      ) {
        return this.grid[rowA][colA];
      }
    }
    // check if there is a tie
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] == "") {
          return "";
        }
      }
    }
    return "Tie";
  }
}
