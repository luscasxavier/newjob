document.getElementById("playerLink").addEventListener("click", function (event) {
    event.preventDefault();

    let computerIcon = document.getElementById("computerIcon");

    if (computerIcon.classList.contains("fa-computer")) {

        computerIcon.classList.remove("fa-computer");
        computerIcon.classList.add("fa-person");
        document.getElementById("playerLink").innerHTML = "Player 1";
        document.getElementById("computerLink").innerHTML = "Player 2";

    } else if (computerIcon.classList.contains("fa-person")) {

        computerIcon.classList.remove("fa-person");
        computerIcon.classList.add("fa-computer");
        document.getElementById("playerLink").innerHTML = "Player";
        document.getElementById("computerLink").innerHTML = "Computer";

    }
});

let currentPlayer = 'X';

function checkWin() {
    const boxes = document.querySelectorAll('.box');
    const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (const combination of combinations) {
        const symbols = combination.map(index => boxes[index].textContent.trim());

        if (symbols.every(symbol => symbol === 'X') || symbols.every(symbol => symbol === 'O')) {
            setTimeout(function () {
                boxes.forEach(box => {
                    box.textContent = '';
                    box.classList.add('empty');
                });
                alert(`Player ${currentPlayer === 'X' ? 'O' : 'X'} won`);
            }, 1200);
            return;
        }
    }
    
    const allFilled = Array.from(boxes).every(box => box.textContent.trim() !== '');

    if (allFilled) {

        setTimeout(function () {
            boxes.forEach(box => {
                box.textContent = '';
                box.classList.add('empty');
            });
            alert('TIE');
        }, 1200);

    }
}

function checkAndClearBoard() {
    const boxes = document.querySelectorAll('.box');
    const allFilled = Array.from(boxes).every(box => box.textContent.trim() !== '');

    if (allFilled) {
        setTimeout(function () {
            boxes.forEach(box => {
                box.textContent = '';
                box.classList.add('empty');
            });
        }, 1200);
        setTimeout(function () {
            boxes.forEach(box => {
                box.classList.remove('empty');
            });
        }, 1500);
    }
}

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', function () {
        if (!box.textContent.trim()) {
            box.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            checkWin();
            checkAndClearBoard();
        }
    });
});