// initialise first pixel that's hovered over
function randomniseRainbow() {
    const red = [255, 0, Math.floor(Math.random() * 255)];
    const pink = [Math.floor(Math.random() * 255), 0, 255];
    const blue = [0, Math.floor(Math.random() * 255), 255];
    const green = [0, 255, Math.floor(Math.random() * 255)];
    const yellow = [Math.floor(Math.random() * 255), 255, 0];
    const orange = [255, Math.floor(Math.random() * 255), 0];
    const rgbArray = [red, pink, blue, green, yellow, orange];

    return rgbArray[Math.floor(Math.random()*6)];
}

// increment rgb values to create rainbow effect
function incrementRgbVals(rgbVals) {
    let incVal = 25;
    let r = rgbVals[0];
    let g = rgbVals[1];
    let b = rgbVals[2];

    if (r === 255 && g < 255 && b === 0) {
        (g + incVal) > 255 ? rgbVals[1] = 255 : rgbVals[1] += incVal; 
    } else if (r > 0 && g === 255 && b === 0) {
        (r - incVal) < 0 ? rgbVals[0] = 0 : rgbVals[0] -= incVal; 
    } else if (r === 0 && g === 255 && b < 255) {
        (b + incVal) > 255 ? rgbVals[2] = 255 : rgbVals[2] += incVal; 
    } else if (r === 0 && g > 0 && b === 255) {
        (g - incVal) < 0 ? rgbVals[1] = 0 : rgbVals[1] -= incVal; 
    } else if (r < 255 && g === 0 && b === 255) {
        (r + incVal) > 255 ? rgbVals[0] = 255 : rgbVals[0] += incVal; 
    } else if (r === 255 && g === 0 && b > 0) {
        (b - incVal) < 0 ? rgbVals[2] = 0 : rgbVals[2] -= incVal;
    } 

    return rgbVals;
}

// calculate 10% of the value used to fade a pixel
function calcFadeVal(val) {
    return Math.ceil(val/10);
}

// create a grid with numSquares as the number of squares per side
function createGrid() {
    const grid = document.querySelector('.grid');
    let rgbVals = randomniseRainbow();
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
        }, {once: true});

        
        grid.appendChild(div);
    }

    grid.style.cssText = `grid-template-columns: repeat(${numSquares}, 1fr); `;
}

let numSquares = 16;
let temp;
let mode = 'black';
let passed = false;
let minusTenR;
let minusTenG;
let minusTenB;

// edit grid button
const editBtn = document.querySelector('.edit-button');
editBtn.addEventListener('click', () => {
    temp = numSquares;
    numSquares = prompt("Enter new number of squares per side", numSquares);

    while ((numSquares > 100 || numSquares < 16) && numSquares !== null) {
        numSquares = prompt("Number has to be between 16 - 100!", numSquares);
    } 

    if (numSquares === null) {
        numSquares = temp;
    }

    createGrid();
});

// rainbow mode
const rainbowBtn = document.querySelector('.rainbow-button');
rainbowBtn.addEventListener('click', () => {
    mode = 'rainbow';
    createGrid();
});

// initial grid
createGrid();