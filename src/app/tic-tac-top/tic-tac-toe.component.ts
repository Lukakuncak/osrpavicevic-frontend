import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  winner: string | null = null;
  gameActive: boolean = true;

  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor() {}

  handleMove(index: number) {
    if (!this.board[index] && this.gameActive && this.currentPlayer === 'X') {
      this.board[index] = this.currentPlayer;
      this.checkWinner();
      if (!this.winner && this.gameActive) {
        this.switchPlayer();
        setTimeout(() => {
          this.computerMove();
        }, 500);
      }
    }
  }

  computerMove() {
    const bestMove = this.getBestMove();
    if (bestMove !== null) {
      this.board[bestMove] = this.currentPlayer;
      this.checkWinner();
      if (!this.winner && this.gameActive) {
        this.switchPlayer();
      }
    }
  }

  getBestMove(): number | null {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === '') {
        this.board[i] = 'O';
        const score = this.minimax(this.board, 0, false);
        this.board[i] = ''; 

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  }

  minimax(board: string[], depth: number, isMaximizing: boolean): number {
    const scores = { X: -1, O: 1, Tie: 0 };
    const result = this.checkWinnerMinimax(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = 'O';
          const score = this.minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = 'X';
          const score = this.minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  checkWinnerMinimax(board: string[]): string | null {
    for (let combo of this.winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every(cell => cell !== '')) {
      return 'Tie';
    }

    return null;
  }

  checkWinner() {
    for (let combo of this.winningCombinations) {
      const [a, b, c] = combo;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        this.gameActive = false;
        return;
      }
    }

    if (this.board.every(cell => cell !== '')) {
      this.winner = 'Tie';
      this.gameActive = false;
    }
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  restartGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameActive = true;
  }
}