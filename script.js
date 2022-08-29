document.addEventListener("DOMContentLoaded", () => {
    const whitePieces = document.querySelectorAll(".white-piece");
    const blackPieces = document.querySelectorAll(".black-piece");

    
    document.querySelectorAll(".soldier").forEach(soldier => {
        soldier.addEventListener("click", ({target}) => {
            if (target.classList.contains("pawn")) {

                let currentRow = target.closest(".row");
                let currentCol = target.closest(".cell");
                let currentPos = currentRow.dataset["row"] + currentCol.dataset["col"];
                console.log(currentPos);

                if (target.classList.contains("white-piece")) {
                    
                } else if (target.classList.contains("black-piece")) {
                    
                }
            }
        });
    });

});