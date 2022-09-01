const piece = [
    ".white-piece",
    ".black-piece"
];

let moveAudio = new Audio("movesound.mp3");
let moveAble = 0;
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
                    if (document.querySelector("#row-" + (parseInt(currentPos / 10) - 1) + " .col-" + (parseInt(currentPos % 10) - 1)) != null && document.querySelector("#row-" + (parseInt(currentPos / 10) - 1) + " .col-" + (parseInt(currentPos % 10) - 1)).hasChildNodes() != false)
                        pushElementInArray(target.classList[1], (parseInt(currentPos / 10) - 1), (parseInt(currentPos % 10) - 1));

                    if (document.querySelector("#row-" + (parseInt(currentPos / 10) - 1) + " .col-" + (parseInt(currentPos % 10) + 1)) != null && document.querySelector("#row-" + (parseInt(currentPos / 10) - 1) + " .col-" + (parseInt(currentPos % 10) + 1)).hasChildNodes() != false)
                        pushElementInArray(target.classList[1], (parseInt(currentPos / 10) - 1), (parseInt(currentPos % 10) + 1));

                    if (document.querySelector("#row-" + (parseInt(currentPos / 10) - 1) + " .col-" + (parseInt(currentPos % 10))).hasChildNodes() != true) {
                        move = currentPos - 10;
                        pushElementInArray(target.classList[1], move / 10, move % 10);
                    }

                } else if (target.classList.contains("black-piece")) {
                    if (document.querySelector("#row-" + (parseInt(currentPos / 10) + 1) + " .col-" + (parseInt(currentPos % 10) - 1)) != null && document.querySelector("#row-" + (parseInt(currentPos / 10) + 1) + " .col-" + (parseInt(currentPos % 10) - 1)).hasChildNodes() != false)
                        pushElementInArray(target.classList[1], (parseInt(currentPos / 10) + 1), (parseInt(currentPos % 10) - 1));
                    if (document.querySelector("#row-" + (parseInt(currentPos / 10) + 1) + " .col-" + (parseInt(currentPos % 10) + 1)) != null && document.querySelector("#row-" + (parseInt(currentPos / 10) + 1) + " .col-" + (parseInt(currentPos % 10) + 1)).hasChildNodes() != false)
                        pushElementInArray(target.classList[1], (parseInt(currentPos / 10) + 1), (parseInt(currentPos % 10) + 1));

                    if (document.querySelector("#row-" + (parseInt(currentPos / 10) + 1) + " .col-" + (parseInt(currentPos % 10))).hasChildNodes() != true) {
                        move = currentPos + 10;
                        pushElementInArray(target.classList[1], move / 10, move % 10);
                    }
                }

            } else if (target.classList.contains("castle") || target.classList.contains("queen")) {
                for (let rowUp = parseInt(currentRow.dataset["row"]) - 1; rowUp >= 1; rowUp--) {
                    if (pushElementInArray(target.classList[1], rowUp, currentCol.dataset["col"]) == false) {
                        break;
                    }
                }

                for (let rowDown = parseInt(currentRow.dataset["row"]) + 1; rowDown <= 8; rowDown++) {
                    if (pushElementInArray(target.classList[1], rowDown, currentCol.dataset["col"]) == false) {
                        break;
                    }
                }
                for (let colLeft = parseInt(currentCol.dataset["col"]) - 1; colLeft >= 1; colLeft--) {
                    if (pushElementInArray(target.classList[1], currentRow.dataset["row"], colLeft) == false) {
                        break;
                    }
                }

                for (let colRight = parseInt(currentCol.dataset["col"]) + 1; colRight <= 8; colRight++) {
                    if (pushElementInArray(target.classList[1], currentRow.dataset["row"], colRight) == false) {
                        break;
                    }
                }

            } else if (target.classList.contains("knight")) {
                // Down right left
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) + 2, parseInt(currentCol.dataset["col"]) + 1);
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) + 2, parseInt(currentCol.dataset["col"]) - 1);

                // Up right left
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) - 2, parseInt(currentCol.dataset["col"]) - 1);
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) - 2, parseInt(currentCol.dataset["col"]) + 1);

                // right up Down
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) + 2);
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) + 2);

                // left up down
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) - 2);
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) - 2);
            } else if (target.classList.contains("king")) {
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]));
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) + 1);

                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]));
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) - 1);

                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]), parseInt(currentCol.dataset["col"]) + 1);
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) - 1, parseInt(currentCol.dataset["col"]) + 1);

                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]), parseInt(currentCol.dataset["col"]) - 1);
                pushElementInArray(target.classList[1], parseInt(currentRow.dataset["row"]) + 1, parseInt(currentCol.dataset["col"]) - 1);

            }

            if (target.classList.contains("bishop") || target.classList.contains("queen")) {
                for (let upRight = parseInt(currentRow.dataset["row"]) - 1, j = 1; upRight >= 1, j <= 8; upRight--, j++) {
                    var colNumber = parseInt(currentCol.dataset["col"]) + j;
                    if (pushElementInArray(target.classList[1], upRight, colNumber) == false) {
                        break;
                    }
                }

                for (let downLeft = parseInt(currentRow.dataset["row"]) + 1, j = 1; downLeft <= 8, j <= 8; downLeft++, j++) {
                    var colNumber = parseInt(currentCol.dataset["col"]) - j;
                    if (pushElementInArray(target.classList[1], downLeft, colNumber) == false) {
                        break;
                    }
                }

                for (let upLeft = parseInt(currentCol.dataset["col"]) - 1, j = 1; upLeft >= 1, j <= 8; upLeft--, j++) {
                    var rowNumber = parseInt(currentRow.dataset["row"]) - j;
                    if (pushElementInArray(target.classList[1], rowNumber, upLeft) == false) {
                        break;
                    }
                }

                for (let downRight = parseInt(currentCol.dataset["col"]) + 1, j = 1; downRight <= 8, j <= 8; downRight++, j++) {
                    var rowNumber = parseInt(currentRow.dataset["row"]) + j;

                    if (pushElementInArray(target.classList[1], rowNumber, downRight) == false) {
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

function pushElementInArray(type, rowNumber, colNumber) {
    colNumber = parseInt(colNumber);
    rowNumber = parseInt(rowNumber);
    var selectedEle = document.querySelector("#row-" + rowNumber + " .col-" + colNumber);
    if (selectedEle == null) {
        return false;
    } else if (selectedEle.children.length == 0) {
        posibleMoves.push(selectedEle);
        return true;
    } else if (selectedEle.children.length != 0 && selectedEle.children[0].classList[1] != type) {
        posibleMoves.push(selectedEle);
        return false;
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
    if (target.children.length != 0)
        target.children[0].remove();

    target.append(currentSoldier);

    document.querySelectorAll(".soldier").forEach(soldier => {
        soldier.classList.toggle("not-movable");
        soldier.classList.toggle("is-move");
    });

    moveAudio.play();
}