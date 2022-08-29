const whitePieces = document.querySelectorAll(".white-piece");
const blackPieces = document.querySelectorAll(".black-piece");
let currentSoldier;
let posibleMoves =[];

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".soldier").forEach(soldier => {
        soldier.addEventListener("click", ({ target }) => {
            removeMoves();
            currentSoldier = target;

            let currentRow = target.closest(".row");
            let currentCol = target.closest(".cell");
            let currentPos = currentRow.dataset["row"] + currentCol.dataset["col"];

            if (target.classList.contains("pawn")) {
                let move;
                if (target.classList.contains("white-piece")) {
                    move = parseInt(currentPos) - 10;
                } else if (target.classList.contains("black-piece")) {
                    move = parseInt(currentPos) + 10;
                }

                document.querySelector("#row-" + parseInt(move / 10) + " .col-" + parseInt(move % 10)).classList.add("posibleMove");
            } else if (target.classList.contains("castle")) {
                let nextMove = parseInt(currentPos) - 10;

                while (document.querySelector("#row-" + parseInt(nextMove / 10) + " .col-" + parseInt(nextMove % 10)).hasChildNodes() == false) {
                    posibleMoves.push(document.querySelector("#row-" + parseInt(nextMove / 10) + " .col-" + parseInt(nextMove % 10)));
                }

                console.log(posibleMoves);
                addMoves();
            }
            console.log("hii");
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
}

function MoveSoldier() {
    document.querySelectorAll(".posibleMove").forEach(cell => {
        cell.setAttribute("onclick","move(event)");
    });
}

function move({target}) {
    target.append(currentSoldier);
}