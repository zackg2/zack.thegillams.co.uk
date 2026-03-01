<
    #game-board {
        width: 400px;
        height: 400px;
        border: 2px solid black;
        position: relative;
    }
    .pacman {
        width: 20px;
        height: 20px;
        background: yellow;
        border-radius: 50%;
        position: absolute;
    }



    document.addEventListener('DOMContentLoaded', () => {
        const pacman = document.getElementById('pacman');
        let pacmanLeft = 0;
        let pacmanTop = 0;
        const stepSize = 20; // adjust this for desired speed

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            switch (key) {
                case 'ArrowUp':
                    movePacman(0, -stepSize);
                    break;
                case 'ArrowDown':
                    movePacman(0, stepSize);
                    break;
                case 'ArrowLeft':
                    movePacman(-stepSize, 0);
                    break;
                case 'ArrowRight':
                    movePacman(stepSize, 0);
                    break;
            }
        });

        function movePacman(deltaX, deltaY) {
            pacmanLeft += deltaX;
            pacmanTop += deltaY;

            // Boundary check
            if (pacmanLeft < 0) pacmanLeft = 0;
            if (pacmanLeft > 380) pacmanLeft = 380;
            if (pacmanTop < 0) pacmanTop = 0;
            if (pacmanTop > 380) pacmanTop = 380;

            pacman.style.left = pacmanLeft + 'px';
            pacman.style.top = pacmanTop + 'px';
        }
    });
