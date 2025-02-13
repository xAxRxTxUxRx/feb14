const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const startButton = document.getElementById("startButton");
        const restartButton = document.getElementById("restartButton");
        const gameOverImage = document.getElementById("gameOverImage");
        const birdImage = document.getElementById("birdImage");

        function resizeCanvas() {
            if (window.innerWidth <= 768) {
                canvas.width = window.innerWidth * 0.8;
                canvas.height = window.innerHeight * 0.8;
            } else {
                canvas.width = 600;
                canvas.height = 400;
            }
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        
        let bird, pipes, frame, score, gameOver, gameStarted;

        function resetGame() {
            bird = { x: 50, y: canvas.height / 2, width: 25, height: 25, velocity: 0, gravity: 0.5, jump: -8 };
            pipes = [];
            frame = 0;
            score = 0;
            gameOver = false;
            gameStarted = true;
            gameOverImage.style.display = "none";
            restartButton.style.display = "none";
            gameLoop();
        }

        function drawBird() {
            ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
        }

        function updateBird() {
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;
            
            if (bird.y + bird.height >= canvas.height) {
                gameOver = true;
            }
        }

        function drawPipes() {
            ctx.fillStyle = "green";
            pipes.forEach(pipe => {
                ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
                ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
            });
        }

        function updatePipes() {
            if (frame % 90 === 0) {
                let gap = 100;
                let topHeight = Math.random() * (canvas.height - gap - 50);
                let bottomHeight = topHeight + gap;
                pipes.push({ x: canvas.width, width: 40, top: topHeight, bottom: bottomHeight, passed: false});
            }
            
            pipes.forEach(pipe => pipe.x -= 3);
            pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
        }

        function checkCollision() {
            pipes.forEach(pipe => {
                if (
                    bird.x < pipe.x + pipe.width &&
                    bird.x + bird.width > pipe.x &&
                    (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
                ) {
                    gameOver = true;
                }
            });
        }

        function updateScore() {
            pipes.forEach(pipe => {
                if (pipe.x + pipe.width < bird.x) {
                    if (!pipe.passed) {
                        score++;
                        pipe.passed = true;
                    }
                }
            });
        }

        function drawScore() {
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText(`Очки: ${score}`, 10, 20);
        }

        function gameLoop() {
            if (!gameStarted) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBird();
            drawPipes();
            drawScore();
            
            if (!gameOver) {
                updateBird();
                updatePipes();
                checkCollision();
                updateScore();
                frame++;
                requestAnimationFrame(gameLoop);
            } else {
                gameOverImage.style.display = "block";
                restartButton.style.display = "block";
            }
        }

        function jump() {
            if (gameStarted && !gameOver) {
                bird.velocity = bird.jump;
            }
        }

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") jump();
        });
        document.addEventListener("click", jump);
        document.addEventListener("touchstart", jump);

        startButton.addEventListener("click", () => {
            startButton.style.display = "none";
            resetGame();
        });

        restartButton.addEventListener("click", () => {
            resetGame();
        });