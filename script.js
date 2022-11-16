// used to create a grid with numSquares as the number of squares per side
function createGrid(numSquares) {
    const grid = document.querySelector('.grid');
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    for (let i=0; i < numSquares**2; i++) {
        const div = document.createElement('div');
        div.classList.add(`cell-${i}`);

        div.addEventListener('mouseover', e => 
            e.target.classList.add('hover-over'), {once: true}
        );
        grid.appendChild(div);
    }

    grid.style.cssText = `grid-template-columns: repeat(${numSquares}, 1fr); `;
}

// edit grid button
const editBtn = document.querySelector('.edit-button');
editBtn.addEventListener('click', e => {
    let numSquares = prompt("Enter new number of squares per side", 16);

    while ((numSquares > 100 || numSquares < 16) && numSquares !== null) {
        numSquares = prompt("Number has to be between 16 - 100!", 16);
        console.log(numSquares);
    } 

    createGrid(numSquares);
});

// initial grid
createGrid(16);