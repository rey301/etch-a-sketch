const grid = document.querySelector('.grid');

for (let i=0; i < 16; i++) {
    const div = document.createElement('div');
    div.classList.add(`cell-${i}`)
    grid.appendChild(div);
}