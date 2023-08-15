import { interval } from "rxjs";
import { boardHeight, boardWidth } from "./config";
import { pieces } from "./pieces";
import "./style.css";

const canvas = document.getElementById("tetris") as HTMLCanvasElement;
const context = canvas.getContext("2d");
const board = createBoard();

const pieceBlockSize = canvas.width / boardWidth;

if (context) {
  context.beginPath();

  // interval(500).subscribe({
  //   next: () => {
  //     movePieceDown();
  //   },
  // });

  renderBoard();
  startTetris();
}

function startTetris() {
  let piece = getRandomPiece();
  renderPiece(context!, piece, 40, 0);
}

function renderPiece(
  context: CanvasRenderingContext2D,
  piece: number[][],
  startPositionX: number,
  startPositionY: number
) {
  context!.fillStyle = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;

  for (const vector of piece) {
    for (const pixel of vector) {
      if (pixel) {
        context.fillRect(
          startPositionX,
          startPositionY,
          pieceBlockSize,
          pieceBlockSize
        );
      }

      startPositionX += pieceBlockSize;
    }

    startPositionX = 40;
    startPositionY += pieceBlockSize;
  }
}

function renderBoard() {
  board.forEach((line, lineIndex) => {
    line.forEach((square, squareIndex) => {
      context!.fillStyle = "#fff";

      context!.fillRect(
        lineIndex * pieceBlockSize,
        squareIndex * pieceBlockSize,
        pieceBlockSize,
        pieceBlockSize
      );
    });
  });
}

function createBoard() {
  let board = [];
  let i = 0;
  let j = 0;

  while (j < boardWidth) {
    let line = [];
    while (i < boardHeight) {
      line.push(0);
      i++;
    }

    board.push(line);
    i = 0;
    j++;
  }

  return board;
}

function movePieceDown() {
  if (canGoDown()) {
    // renderPiece();
  }
}

function canGoDown() {
  return false;
}

function getRandomPiece() {
  const keys = Object.keys(pieces);
  const randomKey = keys[
    Math.floor(Math.random() * keys.length)
  ] as keyof typeof pieces;
  return pieces[randomKey];
}
