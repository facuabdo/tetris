import "./style.css";

const boardWidth = 10;
const boardHeight = 20;

const pieces = {
  I: [[1], [1], [1], [1]],
  J: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const canvas = document.getElementById("tetris") as HTMLCanvasElement;
const context = canvas.getContext("2d");

if (context) {
  let startPositionX = 0;
  let startPositionY = 0;

  context.beginPath();

  context.fillStyle = "red";
  renderPiece(context, pieces.S, startPositionX, startPositionY);

  setInterval(() => {
    context.clearRect(
      startPositionX,
      startPositionX,
      canvas.width,
      canvas.height
    );
    context.moveTo(startPositionX, startPositionY);
    renderPiece(context, pieces.S, startPositionX, startPositionY);
    if (startPositionY <= canvas.height - (pieces.S.length + 1) * 20) {
      console.log(startPositionY);
      startPositionY += 20;
    }
  }, 500);
}

function renderPiece(
  context: CanvasRenderingContext2D,
  piece: number[][],
  startPositionX: number,
  startPositionY: number
) {
  for (const vector of piece) {
    for (const pixel of vector) {
      if (pixel) {
        context.fillRect(startPositionX, startPositionY, 20, 20);
      }

      startPositionX += 20;
    }

    startPositionX = 0;
    startPositionY += 20;
  }
}
