function incrementRgbVals(rgbVals) {
    // [255, 0, 0]
    let incVal = 50;
    let r = rgbVals[0];
    let g = rgbVals[1];
    let b = rgbVals[2];

    if (r === 255 && g === 0 && b < 255) {
        rgbVals[2] += incVal;
        if (rgbVals[2] > 255) {
            rgbVals[2] = 255;
        }
    } else if (r > 0 && g === 0 && b === 255) {
        rgbVals[0] -= incVal;
        if (rgbVals[0] < 0) {
            rgbVals[0] = 0;
        }
    } else if (r === 0 && g < 255 && b === 255) {
        rgbVals[1] += incVal;
        if (rgbVals[1] > 255) {
            rgbVals[1] = 255;
        }
    } else if (r === 0 && g === 255 && b > 0) {
        rgbVals[2] -= incVal
        if (rgbVals[2] < 0) {
            rgbVals[2] = 0;
        }
    } else if (r < 255 && g === 255 && b === 0) {
        rgbVals[0] += incVal;
        if (rgbVals[0] > 255) {
            rgbVals[0] = 255;
        }
    } else if (r === 255 && g > 0 && b === 0) {
        rgbVals[1] -= incVal;
        if (rgbVals[1] < 0) {
            rgbVals[1] = 0;
        }
    }

    return rgbVals;
}

function calcFadeVal(val) {
    return Math.ceil(val/10);
}

// create a grid with numSquares as the number of squares per side
function createGrid() {
    const grid = document.querySelector('.grid');
    let rgbVals = [255, 0, 0];
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    for (let i=0; i < numSquares**2; i++) {
        let fadeColors;
        const div = document.createElement('div');
        div.classList.add(`cell-${i}`);

        div.addEventListener('mouseover', e => {
            if (mode === 'black') {
                e.target.style.backgroundColor = 'black';
            } else if (mode === 'rainbow') {
                let r = rgbVals[0];
                let g = rgbVals[1];
                let b = rgbVals[2];

                e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                rgbVals = incrementRgbVals(rgbVals);

                fadeColors = [calcFadeVal(r), calcFadeVal(g), calcFadeVal(b)];
                const gridChild = grid.children[i];

                gridChild.addEventListener('mouseover', () => {
                    const bgdColor = gridChild.style.backgroundColor;
                    const colorArray = bgdColor.substring(
                        bgdColor.indexOf('(') + 1, 
                        bgdColor.lastIndexOf(')')
                    ).split(',');

                    gridChild.style.backgroundColor = 
                        `rgb(${colorArray[0] - fadeColors[0]},
                        ${colorArray[1] - fadeColors[1]}, 
                        ${colorArray[2] - fadeColors[2]})`
                    ;
                });
            }
        }, {once: false});

        
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
    createGrid();
});

// initial grid
createGrid();