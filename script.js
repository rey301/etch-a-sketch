// create a grid with numSquares as the number of squares per side
function createGrid(numSquares, mode) {
    const grid = document.querySelector('.grid');
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    for (let i=0; i < numSquares**2; i++) {
        let minusTenR;
        let minusTenG;
        let minusTenB;
        const div = document.createElement('div');
        div.classList.add(`cell-${i}`);

        div.addEventListener('mouseover', e => {
            if (mode === 'black') {
                e.target.style.backgroundColor = 'black';
            } else if (mode === 'rainbow') {
                let r = Math.floor(Math.random() * 256);
                let g = Math.floor(Math.random() * 256);
                let b = Math.floor(Math.random() * 256);
                e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                minusTenR = Math.ceil(r/10);
                minusTenG = Math.ceil(g/10);
                minusTenB = Math.ceil(b/10);
                
                const gridChild = grid.children[i];
                gridChild.addEventListener('mouseover', () => {
                    const bgdColor = gridChild.style.backgroundColor;
                    const colorArray = bgdColor.substring(
                        bgdColor.indexOf('(') + 1, 
                        bgdColor.lastIndexOf(')')
                    ).split(',');

                    gridChild.style.backgroundColor = 
                        `rgb(${colorArray[0] - minusTenR},
                        ${colorArray[1] - minusTenG}, ${colorArray[2] - minusTenB})`
                    ;
                });
            }
        }, {once: true});

        
        grid.appendChild(div);
    }

    grid.style.cssText = `grid-template-columns: repeat(${numSquares}, 1fr); `;
}

let numSquares = 16;
let mode = 'black';
let passed = false;
let minusTenR;
let minusTenG;
let minusTenB;

// edit grid button
const editBtn = document.querySelector('.edit-button');
editBtn.addEventListener('click', () => {
    numSquares = prompt("Enter new number of squares per side", 16);

    while ((numSquares > 100 || numSquares < 16) && numSquares !== null) {
        numSquares = prompt("Number has to be between 16 - 100!", 16);
        console.log(numSquares, mode);
    } 

    if (numSquares !== null) {
        createGrid(numSquares, mode);
    }
});

// rainbow mode
const rainbowBtn = document.querySelector('.rainbow-button');
rainbowBtn.addEventListener('click', () => {
    mode = 'rainbow';
    createGrid(numSquares, mode);
});





// initial grid
createGrid(numSquares, mode);