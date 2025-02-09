<script>
      // Get the canvas and context
      const canvas = document.getElementById("pongCanvas");
      const ctx = canvas.getContext("2d");

      // Constants
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      const PADDLE_WIDTH = 10;
      const PADDLE_HEIGHT = 60;
      const BALL_SIZE = 20;
      const BALL_SPEED = 5;
      const PADDLE_SPEED = 7;

      // Paddle and ball initial positions
      let playerPaddle = { x: 50, y: HEIGHT / 2 - PADDLE_HEIGHT / 2 };
      let opponentPaddle = { x: WIDTH - 60, y: HEIGHT / 2 - PADDLE_HEIGHT / 2 };
      let ball = {
        x: WIDTH / 2 - BALL_SIZE / 2,
        y: HEIGHT / 2 - BALL_SIZE / 2,
      };
      let ballDirection = { x: 1, y: 1 };

      // Draw a rectangle
      function drawRect(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
      }

      // Draw the ball
      function drawBall() {
        drawRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE, "#fff");
      }

      // Draw the paddles
      function drawPaddles() {
        drawRect(
          playerPaddle.x,
          playerPaddle.y,
          PADDLE_WIDTH,
          PADDLE_HEIGHT,
          "#fff"
        );
        drawRect(
          opponentPaddle.x,
          opponentPaddle.y,
          PADDLE_WIDTH,
          PADDLE_HEIGHT,
          "#fff"
        );
      }

      // Game loop
      function gameLoop() {
        // Move player paddle
        if (upPressed && playerPaddle.y > 0) {
          playerPaddle.y -= PADDLE_SPEED;
        }
        if (downPressed && playerPaddle.y < HEIGHT - PADDLE_HEIGHT) {
          playerPaddle.y += PADDLE_SPEED;
        }

        // Move opponent paddle
        if (
          opponentPaddle.y < ball.y &&
          opponentPaddle.y < HEIGHT - PADDLE_HEIGHT
        ) {
          opponentPaddle.y += PADDLE_SPEED;
        } else if (opponentPaddle.y > ball.y && opponentPaddle.y > 0) {
          opponentPaddle.y -= PADDLE_SPEED;
        }

        // Move the ball
        ball.x += BALL_SPEED * ballDirection.x;
        ball.y += BALL_SPEED * ballDirection.y;

        // Ball collisions with walls
        if (ball.y <= 0 || ball.y + BALL_SIZE >= HEIGHT) {
          ballDirection.y *= -1;
        }

        // Ball collisions with paddles
        if (
          (ball.x <= playerPaddle.x + PADDLE_WIDTH &&
            ball.y + BALL_SIZE >= playerPaddle.y &&
            ball.y <= playerPaddle.y + PADDLE_HEIGHT) ||
          (ball.x + BALL_SIZE >= opponentPaddle.x &&
            ball.y + BALL_SIZE >= opponentPaddle.y &&
            ball.y <= opponentPaddle.y + PADDLE_HEIGHT)
        ) {
          ballDirection.x *= -1;
        }

        // Clear the canvas
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Draw the game elements
        drawBall();
        drawPaddles();

        // Request the next animation frame
        requestAnimationFrame(gameLoop);
      }

      // Keyboard controls
      let upPressed = false;
      let downPressed = false;

      window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
          upPressed = true;
        } else if (event.key === "ArrowDown") {
          downPressed = true;
        }
      });

      window.addEventListener("keyup", (event) = {
        if (event.key === "ArrowUp") {
          upPressed = false;
        } else if (event.key === "ArrowDown") {
          downPressed = false;
        }
      });

      // Start the game loop
      gameLoop();
    </script>