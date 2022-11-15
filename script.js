const grid = document.querySelector('.grid');

for (let i=0; i < 16; i++) {
    const div = document.createElement('div');
    div.classList.add(`cell-${i}`)

    div.addEventListener('mouseover', e => 
        e.target.classList.add('hover-over'), {once: true});

    grid.appendChild(div);
}