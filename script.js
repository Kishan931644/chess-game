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

                pushElementInArray(move / 10, move % 10);
            } else if (target.classList.contains("castle") || target.classList.contains("queen")) {
                for (let rowUp = parseInt(currentRow.dataset["row"]) - 1; rowUp >= 1; rowUp--) {
                    if (pushElementInArray(rowUp, currentCol.dataset["col"]) == false) {
                        break;
                    }
                }

                for (let rowDown = parseInt(currentRow.dataset["row"]) + 1; rowDown <= 8; rowDown++) {
                    if (pushElementInArray(rowDown, currentCol.dataset["col"]) == false) {
                        break;
                    }
                }
                for (let colLeft = parseInt(currentCol.dataset["col"]) - 1; colLeft >= 1; colLeft--) {
                    if (pushElementInArray(currentRow.dataset["row"], colLeft) == false) {
                        break;
                    }
                }

                for (let colRight = parseInt(currentCol.dataset["col"]) + 1; colRight <= 8; colRight++) {
                    if (pushElementInArray(currentRow.dataset["row"], colRight) == false) {
                        break;
                    }
                }

            } else if (target.classList.contains("knight")) {
                // Down right left
                pushElementInArray(parseInt(currentRow.dataset["row"]) + 2, parseInt(currentCol.dataset["col"]) + 1);
                pushElementInArray(parseInt(currentRow.dataset["row"]) + 2, parseInt(currentCol.dataset["col"]) - 1);

                // Up right left
                pushElementInArray(parseInt(currentRow.dataset["row"]) - 2, parseInt(currentCol.dataset["col"]) - 1);
                pushElementInArray(parseInt(currentRow.dataset["row"]) - 2, parseInt(currentCol.dataset["col"]) + 1);

                // right up Down
                pushElementInArray(parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) + 2);
                pushElementInArray(parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) + 2);

                // left up down
                pushElementInArray(parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) - 2);
                pushElementInArray(parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) - 2);
            } else if (target.classList.contains("king")) {
                pushElementInArray(parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]));
                pushElementInArray(parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) + 1);

                pushElementInArray(parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]));
                pushElementInArray(parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) - 1);

                pushElementInArray(parseInt(currentRow.dataset["row"]), parseInt(currentCol.dataset["col"]) + 1);
                pushElementInArray(parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) + 1);

                pushElementInArray(parseInt(currentRow.dataset["row"]), parseInt(currentCol.dataset["col"]) - 1);
                pushElementInArray(parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) - 1);

            }

            if (target.classList.contains("bishop") || target.classList.contains("queen")) {
                for (let upRight = parseInt(currentRow.dataset["row"]) - 1, j = 1; upRight >= 1, j <= 8; upRight--, j++) {
                    var colNumber = parseInt(currentCol.dataset["col"]) + j;
                    if (pushElementInArray(upRight, colNumber) == false) {
                        break;
                    }
                }

                for (let downLeft = parseInt(currentRow.dataset["row"]) + 1, j = 1; downLeft <= 8, j <= 8; downLeft++, j++) {
                    var colNumber = parseInt(currentCol.dataset["col"]) - j;
                    if (pushElementInArray(downLeft, colNumber) == false) {
                        break;
                    }
                }

                for (let upLeft = parseInt(currentCol.dataset["col"]) - 1, j = 1; upLeft >= 1, j <= 8; upLeft--, j++) {
                    var rowNumber = parseInt(currentRow.dataset["row"]) - j;
                    if (pushElementInArray(rowNumber, upLeft) == false) {
                        break;
                    }
                }

                for (let downRight = parseInt(currentCol.dataset["col"]) + 1, j = 1; downRight <= 8, j <= 8; downRight++, j++) {
                    var rowNumber = parseInt(currentRow.dataset["row"]) + j;

                    if (pushElementInArray(rowNumber, downRight) == false) {
                        break;
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

function pushElementInArray(rowNumber, colNumber) {
    colNumber = parseInt(colNumber);
    rowNumber = parseInt(rowNumber);
    var selectedEle = document.querySelector("#row-" + rowNumber + " .col-" + colNumber)

    if (selectedEle != null && selectedEle.hasChildNodes() == false) {
        posibleMoves.push(selectedEle);
        return true;
    } else {
        return false;
    }
}

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