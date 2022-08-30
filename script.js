const whitePieces = document.querySelectorAll(".white-piece");
const blackPieces = document.querySelectorAll(".black-piece");
let currentSoldier;
let posibleMoves = [];

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".soldier").forEach(soldier => {
        soldier.addEventListener("click", ({ target }) => {
            removeMoves();
            currentSoldier = target;

            let currentRow = target.closest(".row");
            let currentCol = target.closest(".cell");
            let currentPos = parseInt(currentRow.dataset["row"] + currentCol.dataset["col"]);

            if (target.classList.contains("pawn")) {
                let move;
                if (target.classList.contains("white-piece")) {
                    move = currentPos - 10;
                } else if (target.classList.contains("black-piece")) {
                    move = currentPos + 10;
                }

                document.querySelector("#row-" + parseInt(move / 10) + " .col-" + parseInt(move % 10)).classList.add("posibleMove");
            } else if (target.classList.contains("castle")) {
                for (let j = 1; j <= 8; j++) {
                    let number = (parseInt(currentPos / 10) * 10) + j;

                    for (let k = 0; k < 2; k++) {
                        var selectedEle = document.querySelector("#row-" + parseInt(number / 10) + " .col-" + parseInt(number % 10))

                        if (selectedEle != null && selectedEle.hasChildNodes() == false)
                            posibleMoves.push(selectedEle);

                        number = parseInt(currentPos % 10) + (j * 10);
                    }
                }
            } else if (target.classList.contains("bishop")) {
                for (let j = 1; j <= 8; j++) {
                    let number = (parseInt(currentPos / 10) * 10) + j;

                    for (let k = 0; k < 2; k++) {
                        var selectedEle = document.querySelector("#row-" + parseInt(number / 10) + " .col-" + parseInt(number % 10))

                        if (selectedEle != null && selectedEle.hasChildNodes() == false)
                            posibleMoves.push(selectedEle);

                        number = parseInt(currentPos % 10) + (j * 10);
                    }
                }
            }
            addMoves();
            MoveSoldier();
        });
    });


    document.addEventListener("click", ({ target }) => {
        if (!target.classList.contains("soldier"))
            removeMoves();
    });

});

function addMoves() {
    posibleMoves.forEach(element => {
        element.classList.add("posibleMove");
    });
}

function removeMoves() {
    document.querySelectorAll(".posibleMove").forEach(cell => {
        cell.removeAttribute("onclick");
        cell.classList.remove("posibleMove");
    });
    posibleMoves = [];
}

function MoveSoldier() {
    document.querySelectorAll(".posibleMove").forEach(cell => {
        cell.setAttribute("onclick", "move(event)");
    });
}

function move({ target }) {
    target.append(currentSoldier);
}